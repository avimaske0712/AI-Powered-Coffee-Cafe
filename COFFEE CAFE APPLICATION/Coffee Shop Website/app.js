/**
 * COFFEE CAFE - ADVANCED INTERACTIVE ENGINE
 * 1. Database of Coffee Products & ML Profiles
 * 2. Machine Learning Recommendation Engine
 * 3. Real-Time Order Tracking Engine (Simulation & Live Stepper)
 * 4. Loyalty Rewards & Bean Club System
 * 5. Virtual Barista AI Chatbot ("Barista Bella")
 * 6. Quick Toast Notifications & UI Bindings
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATABASE OF COFFEE PRODUCTS & FLAVOR FEATURE VECTORS
  // =========================================================================
  const COFFEE_DATABASE = [
    {
      id: 'bru-coffee',
      name: 'Bru Coffee',
      price: 60,
      originalPrice: 120,
      image: './images/m1.png',
      category: 'Classic',
      temp: 'Hot',
      roast: 3,        // 1-5
      sweetness: 3,    // 1-5
      caffeine: 3,     // 1-5
      milk: 'Dairy',
      notes: ['Traditional Chicory', 'Warm Comfort', 'Rich Foam'],
      vibe: ['Morning Awakening', 'Afternoon Pick-me-up'],
      desc: 'Authentic Indian blended coffee with comforting aromatic chicory undertones.'
    },
    {
      id: 'latte-coffee',
      name: 'Latte Coffee',
      price: 90,
      originalPrice: 150,
      image: './images/m2.png',
      category: 'Espresso & Milk',
      temp: 'Hot',
      roast: 2,
      sweetness: 4,
      caffeine: 2,
      milk: 'Oat Milk',
      notes: ['Silky Cream', 'Mild Espresso', 'Velvety Foam'],
      vibe: ['Deep Work Focus', 'Cozy Evening Relaxation'],
      desc: 'Smooth shot of espresso mellowed with luxurious steamed micro-foam milk.'
    },
    {
      id: 'cappuccino-coffee',
      name: 'Cappuccino Coffee',
      price: 130,
      originalPrice: 160,
      image: './images/m3.png',
      category: 'Espresso & Milk',
      temp: 'Hot',
      roast: 3,
      sweetness: 2,
      caffeine: 3,
      milk: 'Whole Cream',
      notes: ['Bold Foam Cap', 'Balanced Body', 'Cocoa Dusting'],
      vibe: ['Morning Awakening', 'Deep Work Focus'],
      desc: 'Equal parts dark espresso, steamed velvety milk, and cloud-like foam.'
    },
    {
      id: 'hazelnut-coffee',
      name: 'Hazelnut Coffee',
      price: 159,
      originalPrice: 189,
      image: './images/m4.png',
      category: 'Flavored Gourmet',
      temp: 'Hot',
      roast: 2,
      sweetness: 4,
      caffeine: 3,
      milk: 'Almond Milk',
      notes: ['Toasted Hazelnut', 'Caramel Swirl', 'Warm Nutty Aroma'],
      vibe: ['Afternoon Pick-me-up', 'Cozy Evening Relaxation'],
      desc: 'Infused with roasted hazelnuts and delicate vanilla caramel ribbons.'
    },
    {
      id: 'foam-coffee',
      name: 'Foam Coffee (Whipped Dalgona)',
      price: 220,
      originalPrice: 250,
      image: './images/m5.png',
      category: 'Cold Specialty',
      temp: 'Iced',
      roast: 3,
      sweetness: 5,
      caffeine: 3,
      milk: 'Whole Cream',
      notes: ['Whipped Cloud', 'Sweet Caramel', 'Chilled Milk Layer'],
      vibe: ['Social Meetup', 'Afternoon Pick-me-up'],
      desc: 'Whipped golden coffee meringue atop chilled creamy milk and crushed ice.'
    },
    {
      id: 'black-coffee',
      name: 'Artisan Black Coffee',
      price: 300,
      originalPrice: 370,
      image: './images/m6.png',
      category: 'Pure Roast',
      temp: 'Hot',
      roast: 5,
      sweetness: 1,
      caffeine: 5,
      milk: 'Pure Espresso',
      notes: ['Dark Cocoa', 'Smoky Oak', 'Intense Body'],
      vibe: ['Morning Awakening', 'Deep Work Focus'],
      desc: 'Zero-sugar pour-over dark roast delivering pure antioxidant-rich energy.'
    },
    {
      id: 'americano-coffee',
      name: 'Americano Coffee',
      price: 400,
      originalPrice: 500,
      image: './images/m7.png',
      category: 'Espresso Craft',
      temp: 'Hot',
      roast: 4,
      sweetness: 1,
      caffeine: 4,
      milk: 'Pure Espresso',
      notes: ['Crisp Crema', 'Bright Acidity', 'Smooth Bitterness'],
      vibe: ['Deep Work Focus', 'Morning Awakening'],
      desc: 'Double shot of pull-calibrated espresso gently diluted with filtered mineral water.'
    },
    {
      id: 'espresso-coffee',
      name: 'Espresso Doppio',
      price: 549,
      originalPrice: 650,
      image: './images/m8.png',
      category: 'Espresso Craft',
      temp: 'Hot',
      roast: 5,
      sweetness: 1,
      caffeine: 5,
      milk: 'Pure Espresso',
      notes: ['Tiger Striped Crema', 'Concentrated Power', 'Dark Chocolate'],
      vibe: ['Deep Work Focus', 'Morning Awakening'],
      desc: 'Pure, unadulterated essence of the bean extracted at 9 bars of pressure.'
    },
    {
      id: 'arabic-coffee',
      name: 'Arabic Qahwa Coffee',
      price: 1899,
      originalPrice: 2000,
      image: './images/arabica coffee.png',
      category: 'Whole Bean Bags',
      temp: 'Hot',
      roast: 2,
      sweetness: 2,
      caffeine: 3,
      milk: 'Pure Espresso',
      notes: ['Green Cardamom', 'Saffron Threads', 'Spiced Floral'],
      vibe: ['Cozy Evening Relaxation', 'Social Meetup'],
      desc: 'Heritage light-roasted Arabica infused with crushed cardamom and golden saffron.'
    },
    {
      id: 'decaf-coffee',
      name: 'Swiss Water Decaf Coffee',
      price: 1600,
      originalPrice: 1800,
      image: './images/Decaf caffee.png',
      category: 'Whole Bean Bags',
      temp: 'Hot',
      roast: 3,
      sweetness: 3,
      caffeine: 1,
      milk: 'Oat Milk',
      notes: ['Gentle Cocoa', 'Almond Milkiness', 'Zero Jitters'],
      vibe: ['Cozy Evening Relaxation', 'Late Night Reading'],
      desc: '99.9% caffeine-free processed naturally with pure mountain spring water.'
    }
  ];

  // =========================================================================
  // 2. LOYALTY STATE & STORAGE
  // =========================================================================
  const LoyaltyStore = {
    getBeans: function () {
      const stored = localStorage.getItem('cafe_loyalty_beans');
      return stored !== null ? parseInt(stored, 10) : 450;
    },
    setBeans: function (val) {
      localStorage.setItem('cafe_loyalty_beans', val);
      if (window.AuthManager) {
        const user = window.AuthManager.getCurrentUser();
        if (user) {
          user.beans = val;
          localStorage.setItem('cafe_current_user', JSON.stringify(user));
          window.AuthManager.updateNavAuthDisplay();
        }
      }
      LoyaltyStore.updateUI();
    },
    getStamps: function () {
      const stored = localStorage.getItem('cafe_stamps_count');
      return stored !== null ? parseInt(stored, 10) : 4;
    },
    setStamps: function (val) {
      localStorage.setItem('cafe_stamps_count', val);
      LoyaltyStore.updateUI();
    },
    getTier: function (beans) {
      if (beans >= 800) return { name: 'Platinum Diamond 💎', next: 1200, pct: 100 };
      if (beans >= 500) return { name: 'Gold Barista 🥇', next: 800, pct: Math.round(((beans - 500) / 300) * 100) };
      if (beans >= 250) return { name: 'Silver Roast 🥈', next: 500, pct: Math.round(((beans - 250) / 250) * 100) };
      return { name: 'Bronze Bean 🥉', next: 250, pct: Math.round((beans / 250) * 100) };
    },
    updateUI: function () {
      const beans = LoyaltyStore.getBeans();
      const stamps = LoyaltyStore.getStamps();
      const tierInfo = LoyaltyStore.getTier(beans);

      // Pass card
      const memberNameEl = document.getElementById('loyaltyMemberName');
      if (memberNameEl) {
        const user = window.AuthManager ? window.AuthManager.getCurrentUser() : null;
        memberNameEl.textContent = user ? `${user.name} VIP` : 'Coffee Enthusiast VIP';
      }

      const pointsEl = document.getElementById('loyaltyPointsDisplay');
      if (pointsEl) pointsEl.textContent = beans.toLocaleString();

      const tierBadge = document.getElementById('loyaltyTierBadge');
      if (tierBadge) tierBadge.innerHTML = `<i class="fa-solid fa-crown"></i> ${tierInfo.name}`;

      const progressFill = document.getElementById('loyaltyTierProgressFill');
      if (progressFill) progressFill.style.width = Math.min(100, Math.max(15, tierInfo.pct)) + '%';

      const tierMeta = document.getElementById('loyaltyTierMetaText');
      if (tierMeta) {
        if (beans >= 800) {
          tierMeta.textContent = 'Maximum Tier Achieved! VIP Benefits Active.';
        } else {
          const needed = tierInfo.next - beans;
          tierMeta.textContent = `${needed} more Beans to next VIP status tier`;
        }
      }

      // Digital stamps rendering
      const stampSlots = document.querySelectorAll('.stamp-slot');
      stampSlots.forEach((slot, index) => {
        const slotNum = index + 1;
        if (slotNum <= stamps) {
          slot.classList.add('stamped');
          const icon = slot.querySelector('i');
          if (icon) {
            icon.className = slotNum === 6 ? 'fa-solid fa-gift' : 'fa-solid fa-mug-hot';
          }
        } else {
          slot.classList.remove('stamped');
          const icon = slot.querySelector('i');
          if (icon) {
            icon.className = slotNum === 6 ? 'fa-solid fa-gift' : 'fa-regular fa-circle-dot';
          }
        }
      });
    }
  };

  // =========================================================================
  // 3. REAL-TIME ORDER TRACKING SYSTEM
  // =========================================================================
  const OrderTracker = {
    currentOrder: {
      id: '#CC-8421',
      drinkName: 'Hazelnut Coffee with Oat Milk',
      price: 159,
      step: 2, // 1 to 4
      etaSeconds: 220,
      timerInterval: null,
      baristaName: 'Barista Arjun',
      placedTime: 'Just now',
      events: [
        { time: '15:01', text: 'Order received & queued in barista ticket terminal' },
        { time: '15:02', text: 'Single-origin beans ground & calibrated to 93°C pressure' }
      ]
    },

    init: function () {
      const stored = localStorage.getItem('cafe_active_order');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          OrderTracker.currentOrder = Object.assign(OrderTracker.currentOrder, parsed);
        } catch (e) {
          console.error(e);
        }
      }
      OrderTracker.render();
      OrderTracker.startEtaCountdown();
    },

    save: function () {
      localStorage.setItem('cafe_active_order', JSON.stringify({
        id: OrderTracker.currentOrder.id,
        drinkName: OrderTracker.currentOrder.drinkName,
        price: OrderTracker.currentOrder.price,
        step: OrderTracker.currentOrder.step,
        etaSeconds: OrderTracker.currentOrder.etaSeconds,
        placedTime: OrderTracker.currentOrder.placedTime,
        events: OrderTracker.currentOrder.events
      }));
    },

    createNewOrder: function (drinkName, price) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newId = `#CC-${randomNum}`;
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      OrderTracker.currentOrder = {
        id: newId,
        drinkName: drinkName || 'Artisan Hazelnut Coffee',
        price: price || 159,
        step: 1,
        etaSeconds: 360,
        timerInterval: null,
        baristaName: 'Barista Arjun',
        placedTime: nowStr,
        events: [
          { time: nowStr, text: `Order ${newId} confirmed for ${drinkName}. Beans selected.` }
        ]
      };

      OrderTracker.save();
      OrderTracker.render();
      OrderTracker.startEtaCountdown();

      // Award beans
      const addedPoints = Math.round((price || 150) * 0.5);
      LoyaltyStore.setBeans(LoyaltyStore.getBeans() + addedPoints);

      // Increment stamp
      const currentStamps = LoyaltyStore.getStamps();
      if (currentStamps < 6) {
        LoyaltyStore.setStamps(currentStamps + 1);
      }

      showCafeToast(`Order ${newId} placed! +${addedPoints} Beans & 1 Stamp earned! ☕`);

      // Scroll to tracker smoothly
      const trackerSec = document.getElementById('tracker');
      if (trackerSec) {
        trackerSec.scrollIntoView({ behavior: 'smooth' });
      }

      // Trigger automatic simulation progression
      OrderTracker.autoAdvanceSimulation();
    },

    autoAdvanceSimulation: function () {
      if (window._orderSimTimeout) clearTimeout(window._orderSimTimeout);
      
      const stepTimes = [6000, 7000, 8000]; // simulate progress steps quickly
      
      function scheduleNext(idx) {
        if (idx >= stepTimes.length) return;
        window._orderSimTimeout = setTimeout(() => {
          if (OrderTracker.currentOrder.step < 4) {
            OrderTracker.advanceStep();
            scheduleNext(idx + 1);
          }
        }, stepTimes[idx]);
      }
      scheduleNext(0);
    },

    advanceStep: function () {
      if (OrderTracker.currentOrder.step >= 4) {
        showCafeToast('Your coffee is ready for pickup at the counter! ☕✨');
        return;
      }
      OrderTracker.currentOrder.step++;
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (OrderTracker.currentOrder.step === 2) {
        OrderTracker.currentOrder.events.push({
          time: nowStr,
          text: 'Barista began grinding Arabica beans & extracting golden crema.'
        });
        OrderTracker.currentOrder.etaSeconds = 240;
      } else if (OrderTracker.currentOrder.step === 3) {
        OrderTracker.currentOrder.events.push({
          time: nowStr,
          text: 'Steaming micro-foam milk & pouring signature latte art rosette.'
        });
        OrderTracker.currentOrder.etaSeconds = 90;
      } else if (OrderTracker.currentOrder.step === 4) {
        OrderTracker.currentOrder.events.push({
          time: nowStr,
          text: 'Fresh artisan brew poured, dusted with cocoa & ready at pickup counter!'
        });
        OrderTracker.currentOrder.etaSeconds = 0;
        showCafeToast('Order Completed! Enjoy your freshly brewed Coffee Cafe cup! ☕🎉');
      }

      OrderTracker.save();
      OrderTracker.render();
    },

    startEtaCountdown: function () {
      if (OrderTracker.timerInterval) clearInterval(OrderTracker.timerInterval);
      OrderTracker.timerInterval = setInterval(() => {
        if (OrderTracker.currentOrder.etaSeconds > 0 && OrderTracker.currentOrder.step < 4) {
          OrderTracker.currentOrder.etaSeconds--;
          OrderTracker.updateEtaDisplay();
        }
      }, 1000);
      OrderTracker.updateEtaDisplay();
    },

    updateEtaDisplay: function () {
      const etaDisplay = document.getElementById('trackerEtaDisplay');
      if (!etaDisplay) return;

      const sec = OrderTracker.currentOrder.etaSeconds;
      if (sec <= 0 || OrderTracker.currentOrder.step === 4) {
        etaDisplay.textContent = 'Ready Now!';
        etaDisplay.style.color = '#2ecc71';
      } else {
        const mins = Math.floor(sec / 60);
        const remSecs = sec % 60;
        etaDisplay.textContent = `${mins}m ${remSecs < 10 ? '0' : ''}${remSecs}s`;
        etaDisplay.style.color = '#e5a65d';
      }
    },

    render: function () {
      // Step tracker nodes
      const steps = [
        document.getElementById('stepNode1'),
        document.getElementById('stepNode2'),
        document.getElementById('stepNode3'),
        document.getElementById('stepNode4')
      ];

      const currentStep = OrderTracker.currentOrder.step;
      const fillPercentages = [12, 38, 70, 100];

      const stepperFill = document.getElementById('stepperProgressFill');
      if (stepperFill) {
        stepperFill.style.width = fillPercentages[currentStep - 1] + '%';
      }

      steps.forEach((node, idx) => {
        if (!node) return;
        const stepNum = idx + 1;
        node.classList.remove('completed', 'active');
        if (stepNum < currentStep) {
          node.classList.add('completed');
        } else if (stepNum === currentStep) {
          node.classList.add('active');
        }
      });

      // Update Order Meta
      const orderIdEl = document.getElementById('trackerOrderId');
      if (orderIdEl) orderIdEl.textContent = OrderTracker.currentOrder.id;

      const orderDrinkEl = document.getElementById('trackerDrinkTitle');
      if (orderDrinkEl) orderDrinkEl.textContent = OrderTracker.currentOrder.drinkName;

      const orderPriceEl = document.getElementById('trackerDrinkPrice');
      if (orderPriceEl) orderPriceEl.textContent = '₹' + OrderTracker.currentOrder.price;

      // Event Timeline
      const timelineList = document.getElementById('trackerEventsList');
      if (timelineList) {
        timelineList.innerHTML = OrderTracker.currentOrder.events.map((ev, i) => {
          const isLatest = i === OrderTracker.currentOrder.events.length - 1;
          return `
            <li class="${isLatest ? 'latest' : ''}">
              <span class="feed-time">${ev.time}</span>
              ${ev.text}
            </li>
          `;
        }).join('');
      }

      // Input sync
      const orderSearchInput = document.getElementById('orderSearchInput');
      if (orderSearchInput && !orderSearchInput.value) {
        orderSearchInput.value = OrderTracker.currentOrder.id;
      }
    }
  };

  // =========================================================================
  // 4. MACHINE LEARNING RECOMMENDATION ENGINE
  // =========================================================================
  const MLRecommender = {
    // Current user state vector
    userVector: {
      flavor: 'sweet-nutty', // bold-smoky, sweet-nutty, caramel-creamy, citrus-berry, dark-espresso
      temperature: 'Hot',     // Hot, Iced, Blended
      caffeineLevel: 3,       // 1 (Gentle) to 5 (Intense)
      mood: 'Morning Awakening',
      milkBase: 'Oat Milk'
    },

    init: function () {
      MLRecommender.bindEvents();
      MLRecommender.computeAndRender(false);
    },

    bindEvents: function () {
      // Flavor Chips
      const chips = document.querySelectorAll('.flavor-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', function () {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          MLRecommender.userVector.flavor = chip.getAttribute('data-flavor');
        });
      });

      // Temp Pills
      const tempPills = document.querySelectorAll('.temp-pill');
      tempPills.forEach(pill => {
        pill.addEventListener('click', function () {
          tempPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          MLRecommender.userVector.temperature = pill.getAttribute('data-temp');
        });
      });

      // Caffeine Range Slider
      const caffeineSlider = document.getElementById('caffeineRangeInput');
      const caffeineValLabel = document.getElementById('caffeineValLabel');
      if (caffeineSlider) {
        caffeineSlider.addEventListener('input', function () {
          const val = parseInt(this.value, 10);
          MLRecommender.userVector.caffeineLevel = val;
          const labels = ['', 'Gentle Decaf (0-20mg)', 'Mild Flow (~60mg)', 'Balanced Boost (~120mg)', 'High Voltage (~180mg)', 'Turbo Triple Shot (~240mg+)'];
          if (caffeineValLabel) caffeineValLabel.textContent = labels[val] || 'Balanced';
        });
      }

      // Mood Select
      const moodSelect = document.getElementById('recMoodSelect');
      if (moodSelect) {
        moodSelect.addEventListener('change', function () {
          MLRecommender.userVector.mood = this.value;
        });
      }

      // Milk Select
      const milkSelect = document.getElementById('recMilkSelect');
      if (milkSelect) {
        milkSelect.addEventListener('change', function () {
          MLRecommender.userVector.milkBase = this.value;
        });
      }

      // Run AI Match Button
      const runBtn = document.getElementById('btnRunAiRecommender');
      if (runBtn) {
        runBtn.addEventListener('click', function () {
          MLRecommender.computeAndRender(true);
        });
      }

      // Quick Surprise Me
      const surpriseBtn = document.getElementById('btnSurpriseMe');
      if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function () {
          const randomIdx = Math.floor(Math.random() * COFFEE_DATABASE.length);
          const pick = COFFEE_DATABASE[randomIdx];
          MLRecommender.renderResult(pick, (93 + Math.random() * 6).toFixed(1));
          showCafeToast(`AI Surprise Match generated: ${pick.name}! ☕🎲`);
        });
      }
    },

    computeAndRender: function (showAnimation) {
      const runBtn = document.getElementById('btnRunAiRecommender');
      if (showAnimation && runBtn) {
        const originalText = runBtn.innerHTML;
        runBtn.disabled = true;
        runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Calculating Feature Cosine Matrix...`;
        
        setTimeout(() => {
          runBtn.disabled = false;
          runBtn.innerHTML = originalText;
          MLRecommender.executeCosineModel();
        }, 650);
      } else {
        MLRecommender.executeCosineModel();
      }
    },

    executeCosineModel: function () {
      const u = MLRecommender.userVector;

      // Score each drink in database using a weighted feature matrix
      const scoredItems = COFFEE_DATABASE.map(item => {
        let score = 0;

        // 1. Temperature match (weight 25)
        if (item.temp === u.temperature) {
          score += 25;
        } else if (u.temperature === 'Blended' && item.temp === 'Iced') {
          score += 15;
        }

        // 2. Caffeine distance (weight 30)
        const diffCaff = Math.abs(item.caffeine - u.caffeineLevel);
        score += Math.max(0, 30 - (diffCaff * 8));

        // 3. Flavor profile match (weight 25)
        if (u.flavor === 'sweet-nutty' && (item.id === 'hazelnut-coffee' || item.id === 'foam-coffee' || item.id === 'latte-coffee')) {
          score += 25;
        } else if (u.flavor === 'bold-smoky' && (item.id === 'black-coffee' || item.id === 'espresso-coffee' || item.id === 'americano-coffee')) {
          score += 25;
        } else if (u.flavor === 'caramel-creamy' && (item.id === 'cappuccino-coffee' || item.id === 'latte-coffee' || item.id === 'bru-coffee')) {
          score += 25;
        } else if (u.flavor === 'citrus-berry' && (item.id === 'arabic-coffee' || item.id === 'americano-coffee')) {
          score += 25;
        } else if (u.flavor === 'dark-espresso' && (item.id === 'espresso-coffee' || item.id === 'black-coffee')) {
          score += 25;
        } else {
          score += 12; // base compatibility
        }

        // 4. Milk / Base preference (weight 10)
        if (u.milkBase === 'Pure Espresso' && (item.milk === 'Pure Espresso' || item.id === 'black-coffee')) {
          score += 10;
        } else if (u.milkBase !== 'Pure Espresso' && item.milk !== 'Pure Espresso') {
          score += 10;
        }

        // 5. Vibe affinity (weight 10)
        if (item.vibe.includes(u.mood)) {
          score += 10;
        }

        // Normalize to 88% - 99.4%
        const normalizedPct = (88 + (score / 100) * 11.4).toFixed(1);

        return {
          drink: item,
          rawScore: score,
          percentage: normalizedPct
        };
      });

      // Sort descending by highest match
      scoredItems.sort((a, b) => b.rawScore - a.rawScore);
      const topMatch = scoredItems[0];

      MLRecommender.renderResult(topMatch.drink, topMatch.percentage);
      MLRecommender.renderCollaborativePairings(scoredItems.slice(1, 4));
    },

    renderResult: function (drink, matchPercentage) {
      const matchBadge = document.getElementById('recMatchBadgeVal');
      if (matchBadge) matchBadge.textContent = matchPercentage + '% Match';

      const titleEl = document.getElementById('recResultTitle');
      if (titleEl) titleEl.textContent = drink.name;

      const priceEl = document.getElementById('recResultPrice');
      if (priceEl) priceEl.innerHTML = `₹${drink.price} <strike>₹${drink.originalPrice}</strike>`;

      const imgEl = document.getElementById('recResultImg');
      if (imgEl) {
        imgEl.src = drink.image;
        imgEl.alt = drink.name;
      }

      // Feature bars
      const roastFill = document.getElementById('recRoastFill');
      if (roastFill) roastFill.style.width = (drink.roast * 20) + '%';

      const sweetFill = document.getElementById('recSweetnessFill');
      if (sweetFill) sweetFill.style.width = (drink.sweetness * 20) + '%';

      const caffeineFill = document.getElementById('recCaffeineFill');
      if (caffeineFill) caffeineFill.style.width = (drink.caffeine * 20) + '%';

      // Reasoning
      const quoteEl = document.getElementById('recReasoningQuote');
      if (quoteEl) {
        quoteEl.innerHTML = `<strong>✨ Barista AI Insight:</strong> We calibrated this recipe for your <em>${MLRecommender.userVector.mood}</em> vibe. Its ${drink.notes.join(', ')} notes pair seamlessly with your ${MLRecommender.userVector.milkBase} preference!`;
      }

      // Button to quick order
      const orderBtn = document.getElementById('btnOrderMlRecommendation');
      if (orderBtn) {
        orderBtn.onclick = function () {
          OrderTracker.createNewOrder(drink.name, drink.price);
        };
      }
    },

    renderCollaborativePairings: function (pairings) {
      const container = document.getElementById('collaborativePicksGrid');
      if (!container) return;

      container.innerHTML = pairings.map(pair => {
        return `
          <div class="col-md-4 mb-3">
            <div class="collaborative-card">
              <img src="${pair.drink.image}" class="collab-thumb" alt="${pair.drink.name}">
              <div style="flex-grow: 1;">
                <h6 style="margin: 0; font-size: 0.88rem; font-weight: 700;">${pair.drink.name}</h6>
                <div style="font-size: 0.78rem; color: #b2744c; font-weight: 700;">₹${pair.drink.price} • <span style="color:#2ecc71;">${pair.percentage}% Match</span></div>
                <button class="btn btn-sm btn-outline-dark mt-2 py-0 px-2" style="font-size: 0.74rem; font-weight: 700;" onclick="window.quickOrderDrink('${pair.drink.name}', ${pair.drink.price})">Quick Order</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  };

  // =========================================================================
  // 5. VIRTUAL BARISTA AI CHATBOT ("BARISTA BELLA")
  // =========================================================================
  const BaristaBella = {
    isOpen: false,
    audioEnabled: true,

    init: function () {
      BaristaBella.bindEvents();
    },

    toggle: function () {
      BaristaBella.isOpen = !BaristaBella.isOpen;
      const chatWin = document.getElementById('baristaChatWindow');
      if (chatWin) {
        if (BaristaBella.isOpen) {
          chatWin.classList.add('open');
          const input = document.getElementById('baristaChatInput');
          if (input) setTimeout(() => input.focus(), 200);
        } else {
          chatWin.classList.remove('open');
        }
      }
    },

    bindEvents: function () {
      // Floating toggle
      const toggleBtn = document.getElementById('baristaChatToggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', BaristaBella.toggle);
      }

      // Nav launch button
      const navBtn = document.getElementById('navBaristaLaunchBtn');
      if (navBtn) {
        navBtn.addEventListener('click', function (e) {
          e.preventDefault();
          if (!BaristaBella.isOpen) BaristaBella.toggle();
        });
      }

      // Close button
      const closeBtn = document.getElementById('btnChatClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', BaristaBella.toggle);
      }

      // Reset chat
      const resetBtn = document.getElementById('btnChatReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          const body = document.getElementById('chatMessagesBody');
          if (body) {
            body.innerHTML = `
              <div class="chat-msg-row bot">
                <div class="chat-bubble">
                  Hello coffee lover! ☕ I'm <strong>Barista Bella</strong>, your virtual coffee sommelier. Ask me for personalized drink suggestions, order tracking, dietary options, or bean rewards!
                </div>
              </div>
            `;
          }
        });
      }

      // Send button & enter key
      const sendBtn = document.getElementById('btnChatSend');
      const input = document.getElementById('baristaChatInput');

      if (sendBtn && input) {
        sendBtn.addEventListener('click', function () {
          BaristaBella.handleUserSend();
        });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            BaristaBella.handleUserSend();
          }
        });
      }

      // Quick chips
      const chips = document.querySelectorAll('.quick-chip-btn');
      chips.forEach(chip => {
        chip.addEventListener('click', function () {
          const prompt = chip.getAttribute('data-prompt');
          if (input) {
            input.value = prompt;
            BaristaBella.handleUserSend();
          }
        });
      });
    },

    handleUserSend: function () {
      const input = document.getElementById('baristaChatInput');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      input.value = '';
      BaristaBella.appendMessage('user', text);

      // Typing animation
      BaristaBella.showTypingIndicator();

      // Process intent with intelligent coffee sommelier engine
      setTimeout(() => {
        BaristaBella.hideTypingIndicator();
        BaristaBella.generateResponse(text);
      }, 700 + Math.random() * 400);
    },

    showTypingIndicator: function () {
      const body = document.getElementById('chatMessagesBody');
      if (!body) return;
      const indicator = document.createElement('div');
      indicator.className = 'chat-msg-row bot typing-row';
      indicator.id = 'chatTypingIndicator';
      indicator.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      body.appendChild(indicator);
      body.scrollTop = body.scrollHeight;
    },

    hideTypingIndicator: function () {
      const indicator = document.getElementById('chatTypingIndicator');
      if (indicator) indicator.remove();
    },

    appendMessage: function (sender, content, isHtml) {
      const body = document.getElementById('chatMessagesBody');
      if (!body) return;

      const row = document.createElement('div');
      row.className = `chat-msg-row ${sender}`;

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';

      if (isHtml) {
        bubble.innerHTML = content;
      } else {
        bubble.textContent = content;
      }

      row.appendChild(bubble);
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    },

    generateResponse: function (query) {
      const q = query.toLowerCase();

      // 1. Order Tracking Inquiry
      if (q.includes('track') || q.includes('where is my') || q.includes('status') || q.includes('eta') || q.includes('order')) {
        const order = OrderTracker.currentOrder;
        const stepLabels = [
          'Order Confirmed & Queued',
          'Grinding & 93°C Extraction',
          'Frothing & Latte Art',
          'Ready for Pickup! ☕'
        ];
        const statusText = stepLabels[order.step - 1];

        const responseHtml = `
          <strong>📦 Live Order Status:</strong><br>
          Order <code>${order.id}</code> (${order.drinkName})<br>
          <strong>Status:</strong> ${statusText}<br>
          <strong>Estimated Time:</strong> ${order.step === 4 ? 'Ready at counter!' : Math.ceil(order.etaSeconds / 60) + ' mins remaining'}<br>
          <a href="#tracker" style="color:#b2744c; font-weight:700; text-decoration:underline;">View Live Tracker Stepper ➔</a>
        `;
        BaristaBella.appendMessage('bot', responseHtml, true);
        return;
      }

      // 2. Loyalty / Bean Points Inquiry
      if (q.includes('loyalty') || q.includes('bean') || q.includes('point') || q.includes('reward') || q.includes('stamp')) {
        const beans = LoyaltyStore.getBeans();
        const stamps = LoyaltyStore.getStamps();
        const tier = LoyaltyStore.getTier(beans);

        const currentUser = window.AuthManager ? window.AuthManager.getCurrentUser() : null;
        const greeting = currentUser ? `Hello <strong>${currentUser.name.split(' ')[0]}</strong>! ` : '';

        const responseHtml = `
          <strong>☕ Bean Club Membership:</strong><br>
          ${greeting}You currently have <strong>${beans} Bean Points</strong> in your balance (${tier.name})!<br>
          Digital Stamp Card: <strong>${stamps}/6 stamps</strong> filled.<br>
          <div style="margin-top:6px;">
            ${beans >= 400 ? '🎉 You have enough points to redeem a <strong>FREE Latte</strong>!' : 'Earn ' + (400 - beans) + ' more beans for a free signature drink.'}
          </div>
          <a href="#rewards" style="color:#b2744c; font-weight:700; text-decoration:underline;">Visit Rewards Store ➔</a>
        `;
        BaristaBella.appendMessage('bot', responseHtml, true);
        return;
      }

      // 3. Sweet / Flavored Coffee
      if (q.includes('sweet') || q.includes('sugar') || q.includes('caramel') || q.includes('hazelnut') || q.includes('vanilla')) {
        const item = COFFEE_DATABASE.find(d => d.id === 'hazelnut-coffee');
        const responseHtml = `
          I recommend our bestselling <strong>Hazelnut Coffee</strong>! It features velvety roasted hazelnut notes with a delicate touch of brown sugar and silky steamed milk.
          <div class="chat-product-embed">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h6>${item.name}</h6>
              <p>₹${item.price}</p>
            </div>
            <button class="chat-embed-order-btn" onclick="window.quickOrderDrink('${item.name}', ${item.price})">Order Now</button>
          </div>
        `;
        BaristaBella.appendMessage('bot', responseHtml, true);
        return;
      }

      // 4. Cold / Iced Coffee
      if (q.includes('cold') || q.includes('iced') || q.includes('chilled') || q.includes('frappe') || q.includes('refreshing')) {
        const item = COFFEE_DATABASE.find(d => d.id === 'foam-coffee');
        const responseHtml = `
          Beat the heat with our artisan <strong>Whipped Foam Coffee (Dalgona)</strong>! Fluffy golden coffee meringue over ice-chilled organic milk.
          <div class="chat-product-embed">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h6>${item.name}</h6>
              <p>₹${item.price}</p>
            </div>
            <button class="chat-embed-order-btn" onclick="window.quickOrderDrink('${item.name}', ${item.price})">Order Now</button>
          </div>
        `;
        BaristaBella.appendMessage('bot', responseHtml, true);
        return;
      }

      // 5. Strong / High Caffeine / Black / Wake Up
      if (q.includes('strong') || q.includes('caffeine') || q.includes('dark') || q.includes('wake') || q.includes('black') || q.includes('espresso')) {
        const item = COFFEE_DATABASE.find(d => d.id === 'espresso-coffee');
        const responseHtml = `
          Need maximum energy? Our <strong>Espresso Doppio</strong> delivers an uncompromised double extraction at 9 bars of pressure with a thick golden tiger crema!
          <div class="chat-product-embed">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h6>${item.name}</h6>
              <p>₹${item.price}</p>
            </div>
            <button class="chat-embed-order-btn" onclick="window.quickOrderDrink('${item.name}', ${item.price})">Order Now</button>
          </div>
        `;
        BaristaBella.appendMessage('bot', responseHtml, true);
        return;
      }

      // 6. Decaf / Vegan / Dietary
      if (q.includes('decaf') || q.includes('vegan') || q.includes('oat') || q.includes('almond') || q.includes('diet') || q.includes('healthy')) {
        const item = COFFEE_DATABASE.find(d => d.id === 'decaf-coffee');
        const responseHtml = `
          We take dietary lifestyle seriously! All our coffees can be paired with <strong>Barista Oat Milk</strong> or <strong>Almond Milk</strong>. If you want zero caffeine, our <strong>Swiss Water Decaf</strong> has 100% full flavor with 0% jitters!
          <div class="chat-product-embed">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h6>${item.name}</h6>
              <p>₹${item.price}</p>
            </div>
            <button class="chat-embed-order-btn" onclick="window.quickOrderDrink('${item.name}', ${item.price})">Order Now</button>
          </div>
        `;
        BaristaBella.appendMessage('bot', responseHtml, true);
        return;
      }

      // 7. General Recommendation or Default
      const randomDrink = COFFEE_DATABASE[Math.floor(Math.random() * 4)];
      const responseHtml = `
        Based on our cafe's current roast batch, I enthusiastically recommend the <strong>${randomDrink.name}</strong>! It has ${randomDrink.notes.join(' & ')} notes.
        <div class="chat-product-embed">
          <img src="${randomDrink.image}" alt="${randomDrink.name}">
          <div>
            <h6>${randomDrink.name}</h6>
            <p>₹${randomDrink.price}</p>
          </div>
          <button class="chat-embed-order-btn" onclick="window.quickOrderDrink('${randomDrink.name}', ${randomDrink.price})">Order Now</button>
        </div>
        <p style="margin-top:8px;font-size:0.8rem;color:#777;">You can also ask me: <em>"Where is my order?"</em> or <em>"How many points do I have?"</em></p>
      `;
      BaristaBella.appendMessage('bot', responseHtml, true);
    }
  };

  // =========================================================================
  // 6. GLOBAL TOAST & CART HELPERS
  // =========================================================================
  window.addToCheckoutCart = function (name, price, image) {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cafe_checkout_cart') || '[]');
      if (!Array.isArray(cart)) cart = [];
    } catch (e) {
      cart = [];
    }

    const existing = cart.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        price: price,
        qty: 1,
        image: image || './images/m1.png'
      });
    }

    localStorage.setItem('cafe_checkout_cart', JSON.stringify(cart));
    window.updateNavCartCount();

    if (window.showCafeToast) {
      window.showCafeToast(`Added <strong>${name}</strong> to Cart! <a href="checkout.html" style="color: #e5a65d; text-decoration: underline; font-weight: 700; margin-left: 6px;">Checkout Now ➔</a>`);
    }
  };

  window.updateNavCartCount = function () {
    const badge = document.getElementById('navCartCount');
    if (!badge) return;
    try {
      const cart = JSON.parse(localStorage.getItem('cafe_checkout_cart') || '[]');
      const count = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.qty || 1), 0) : 0;
      badge.textContent = count > 0 ? count : 2; // Defaults to 2 if uninitialized demo
    } catch (e) {
      badge.textContent = 2;
    }
  };

  window.showCafeToast = function (message) {
    let container = document.getElementById('cafeToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cafeToastContainer';
      container.className = 'cafe-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'cafe-toast';
    toast.innerHTML = `
      <i class="fa-solid fa-mug-hot" style="color: #e5a65d; font-size: 1.2rem;"></i>
      <div style="flex-grow:1;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(60px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  window.quickOrderDrink = function (name, price) {
    OrderTracker.createNewOrder(name, price);
  };

  window.advanceOrderStepDemo = function () {
    OrderTracker.advanceStep();
  };

  window.lookupOrderById = function () {
    const input = document.getElementById('orderSearchInput');
    if (!input || !input.value.trim()) return;
    const qId = input.value.trim().toUpperCase();
    if (qId === OrderTracker.currentOrder.id.toUpperCase()) {
      showCafeToast(`Found active order ${OrderTracker.currentOrder.id}! ☕`);
      OrderTracker.render();
    } else {
      // Simulate finding that order
      OrderTracker.currentOrder.id = qId;
      OrderTracker.currentOrder.step = Math.min(3, Math.max(1, (qId.charCodeAt(qId.length - 1) % 4) + 1));
      OrderTracker.render();
      showCafeToast(`Tracking Order ${qId}: Status updated.`);
    }
  };

  // Redeem Reward handler
  window.redeemRewardItem = function (itemName, cost) {
    const currentBeans = LoyaltyStore.getBeans();
    if (currentBeans < cost) {
      showCafeToast(`⚠️ Insufficient beans! You have ${currentBeans} Beans, need ${cost}.`);
      return;
    }

    // Deduct
    LoyaltyStore.setBeans(currentBeans - cost);

    // Generate voucher code
    const voucherCode = 'CAFE-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Populate modal
    const codeEl = document.getElementById('voucherModalCode');
    if (codeEl) codeEl.textContent = voucherCode;

    const itemEl = document.getElementById('voucherModalItemTitle');
    if (itemEl) itemEl.textContent = itemName;

    // Show bootstrap modal
    const modalEl = document.getElementById('voucherRedeemModal');
    if (modalEl && window.bootstrap) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }

    showCafeToast(`🎉 Successfully redeemed ${itemName}! Enjoy your treat!`);
  };

  // Add Stamp manual button
  window.addManualStamp = function () {
    const current = LoyaltyStore.getStamps();
    if (current >= 6) {
      LoyaltyStore.setStamps(1);
      showCafeToast('New Stamp Card started! 1/6 stamps. ☕');
    } else {
      const next = current + 1;
      LoyaltyStore.setStamps(next);
      if (next === 6) {
        showCafeToast('🎉 CONGRATULATIONS! Stamp card complete! You earned a FREE Drink + 100 Bonus Beans! ☕🎁');
        LoyaltyStore.setBeans(LoyaltyStore.getBeans() + 100);
      } else {
        showCafeToast(`Stamp added! (${next}/6) - Keep sipping! ☕`);
      }
    }
  };

  // Daily Bonus Beans
  window.claimDailyBonus = function () {
    const btn = document.getElementById('btnDailyBonus');
    if (btn && btn.disabled) return;

    const bonus = 50;
    LoyaltyStore.setBeans(LoyaltyStore.getBeans() + bonus);
    showCafeToast(`🎁 Daily Bonus Claimed! +${bonus} Beans added to your wallet!`);

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Bonus Claimed Today (+50)`;
    }
  };

  // =========================================================================
  // 7. INITIALIZE ON DOM CONTENT LOADED
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    LoyaltyStore.updateUI();
    OrderTracker.init();
    MLRecommender.init();
    BaristaBella.init();
    window.updateNavCartCount();

    // Wire up Menu & Product card shopping carts to add to cart & trigger order
    const cartIcons = document.querySelectorAll('.menu .card-body p span, .product .card-body p span');
    cartIcons.forEach(cartSpan => {
      cartSpan.title = 'Add to Cart & Checkout';
      cartSpan.addEventListener('click', function (e) {
        e.preventDefault();
        const card = this.closest('.card');
        const titleEl = card.querySelector('h3');
        const priceEl = card.querySelector('p');
        const imgEl = card.querySelector('img');
        const drinkName = titleEl ? titleEl.textContent.trim() : 'Coffee Special';
        const imgSrc = imgEl ? imgEl.getAttribute('src') : './images/m1.png';
        let priceNum = 120;
        if (priceEl) {
          const match = priceEl.textContent.match(/₹\s*(\d+)/);
          if (match) priceNum = parseInt(match[1], 10);
        }
        window.addToCheckoutCart(drinkName, priceNum, imgSrc);
      });
    });

    // Wire Hero buttons
    const heroShopBtn = document.getElementById('btn');
    if (heroShopBtn) {
      heroShopBtn.addEventListener('click', function () {
        const menuSec = document.getElementById('menu');
        if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

})();

