/**
 * COFFEE CAFE - AUTHENTICATION & USER MANAGEMENT ENGINE
 * Handles login, registration, password validation, demo accounts,
 * session persistence in localStorage, and loyalty profile sync.
 */

(function () {
  'use strict';

  // Seed default demo user if not present
  const DEFAULT_DEMO_USER = {
    id: 'usr-vip-9942',
    name: 'Alex Vance',
    email: 'alex@coffeecafe.com',
    password: 'coffee123',
    phone: '+91 9876543210',
    tier: 'Gold Barista 🥇',
    beans: 450,
    stamps: 4,
    favDrink: 'Hazelnut Coffee with Oat Milk',
    joinedDate: 'October 2026'
  };

  const AuthManager = {
    // Get all registered users from localStorage
    getUsers: function () {
      const stored = localStorage.getItem('cafe_registered_users');
      if (!stored) {
        const initial = [DEFAULT_DEMO_USER];
        localStorage.setItem('cafe_registered_users', JSON.stringify(initial));
        return initial;
      }
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [DEFAULT_DEMO_USER];
      }
    },

    saveUsers: function (users) {
      localStorage.setItem('cafe_registered_users', JSON.stringify(users));
    },

    // Get current authenticated user session
    getCurrentUser: function () {
      const stored = localStorage.getItem('cafe_current_user');
      if (!stored) return null;
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    },

    setCurrentUser: function (user) {
      if (user) {
        localStorage.setItem('cafe_current_user', JSON.stringify(user));
        // Synchronize with LoyaltyStore
        if (user.beans !== undefined) {
          localStorage.setItem('cafe_loyalty_beans', user.beans);
        }
        if (user.stamps !== undefined) {
          localStorage.setItem('cafe_stamps_count', user.stamps);
        }
      } else {
        localStorage.removeItem('cafe_current_user');
      }
      AuthManager.updateNavAuthDisplay();
    },

    // Sign in handler
    login: function (email, password, rememberMe) {
      const users = AuthManager.getUsers();
      const cleanEmail = (email || '').trim().toLowerCase();

      const user = users.find(u => u.email.toLowerCase() === cleanEmail);

      if (!user) {
        return { success: false, message: 'No account found with this email address. Please register.' };
      }

      if (user.password !== password) {
        return { success: false, message: 'Incorrect password. Please try again or use Forgot Password.' };
      }

      // Successful login
      AuthManager.setCurrentUser(user);

      if (rememberMe) {
        localStorage.setItem('cafe_remember_email', cleanEmail);
      } else {
        localStorage.removeItem('cafe_remember_email');
      }

      return { success: true, user: user, message: `Welcome back, ${user.name}! ☕` };
    },

    // Registration handler
    register: function (formData) {
      const { name, email, phone, password, confirmPassword, favDrink } = formData;
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanName = (name || '').trim();

      if (!cleanName) {
        return { success: false, message: 'Please provide your full name.' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return { success: false, message: 'Please enter a valid email address.' };
      }

      if (!password || password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long.' };
      }

      if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match. Please re-enter.' };
      }

      const users = AuthManager.getUsers();
      const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        return { success: false, message: 'An account with this email already exists. Please sign in.' };
      }

      // Create new user with 100 Welcome Bonus Beans!
      const newUser = {
        id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
        name: cleanName,
        email: cleanEmail,
        password: password,
        phone: phone || '',
        tier: 'Bronze Bean 🥉',
        beans: 100, // Instant Welcome Reward
        stamps: 1,  // Welcome first stamp
        favDrink: favDrink || 'Cappuccino Coffee',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      users.push(newUser);
      AuthManager.saveUsers(users);
      AuthManager.setCurrentUser(newUser);

      return {
        success: true,
        user: newUser,
        message: `Account created! 🎉 You've received 100 Welcome Bean Points!`
      };
    },

    // Quick demo login helper
    quickDemoLogin: function () {
      return AuthManager.login(DEFAULT_DEMO_USER.email, DEFAULT_DEMO_USER.password, true);
    },

    // Sign out handler
    logout: function () {
      AuthManager.setCurrentUser(null);
      sessionStorage.removeItem('cafe_guest_mode');
      // Reset beans to default guest level if desired
      localStorage.setItem('cafe_loyalty_beans', 450);
      localStorage.setItem('cafe_stamps_count', 4);
      AuthManager.updateNavAuthDisplay();
      if (window.showCafeToast) {
        window.showCafeToast('You have signed out. Redirecting to login... ☕');
      }
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 500);
      // If already on login page, re-render
      if (window.renderLoginPageState) {
        window.renderLoginPageState();
      }
    },

    // Update navigation bar auth button on index.html
    updateNavAuthDisplay: function () {
      const slot = document.getElementById('navUserAuthSlot');
      if (!slot) return;

      const user = AuthManager.getCurrentUser();

      if (user) {
        slot.innerHTML = `
          <div class="dropdown">
            <button class="nav-user-profile-btn dropdown-toggle" type="button" id="userMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="user-avatar-badge"><i class="fa-solid fa-user"></i></span>
              <span class="user-name-text">${user.name.split(' ')[0]}</span>
              <span class="user-beans-pill"><i class="fa-solid fa-crown text-warning"></i> ${user.beans || 450} ☕</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userMenuDropdown" style="border-radius: 14px; min-width: 220px; padding: 10px;">
              <li class="px-3 py-2 border-bottom">
                <div style="font-weight: 800; color: #1f130b; font-size: 0.95rem;">${user.name}</div>
                <div style="font-size: 0.75rem; color: #888;">${user.email}</div>
                <div class="badge bg-warning text-dark mt-1" style="font-size: 0.72rem;">${user.tier || 'Gold Barista 🥇'}</div>
              </li>
              <li><a class="dropdown-item py-2 fw-bold" href="checkout.html"><i class="fa-solid fa-cart-shopping text-warning me-2"></i> My Cart & Checkout</a></li>
              <li><a class="dropdown-item py-2 fw-bold" href="#rewards"><i class="fa-solid fa-gift text-warning me-2"></i> My Bean Rewards</a></li>
              <li><a class="dropdown-item py-2 fw-bold" href="#tracker"><i class="fa-solid fa-clock-rotate-left text-primary me-2"></i> Active Order Tracker</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item py-2 text-danger fw-bold" type="button" onclick="AuthManager.logout()"><i class="fa-solid fa-right-from-bracket me-2"></i> Sign Out</button></li>
            </ul>
          </div>
        `;
      } else {
        slot.innerHTML = `
          <a href="login.html" class="nav-login-btn">
            <i class="fa-solid fa-user"></i> Sign In
          </a>
        `;
      }
    }
  };

  // Expose globally
  window.AuthManager = AuthManager;

  // Initialize on load
  document.addEventListener('DOMContentLoaded', function () {
    AuthManager.updateNavAuthDisplay();

    // Check URL parameters for login notification
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('login_success')) {
      const user = AuthManager.getCurrentUser();
      const userName = user ? user.name : 'Coffee Lover';
      setTimeout(() => {
        if (window.showCafeToast) {
          window.showCafeToast(`Welcome back, ${userName}! ☕ Your VIP perks are ready.`);
        }
      }, 500);
      // Clean query parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.has('registered')) {
      setTimeout(() => {
        if (window.showCafeToast) {
          window.showCafeToast(`🎉 Account activated! +100 Welcome Beans added to your wallet!`);
        }
      }, 500);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });

})();

