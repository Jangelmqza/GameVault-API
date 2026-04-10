/**
 * public/js/cheats.js
 * Versión Avanzada: Easter Eggs, Cheat Console con Badges y Auto-expiración
 */

const Cheats = (() => {
    // --- MÓDULO: AUDIO (Web Audio API) ---
    const AudioEngine = {
        ctx: null,
        init() {
            if (!this.ctx) {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            }
        },
        playTone(freq, type, duration, volume = 0.1) {
            this.init();
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(volume, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        },
        playPowerUp() { this.playTone(523.25, 'square', 0.1, 0.05); setTimeout(() => this.playTone(659.25, 'square', 0.1, 0.05), 100); setTimeout(() => this.playTone(783.99, 'square', 0.2, 0.05), 200); },
        playCoin() { this.playTone(987.77, 'square', 0.1, 0.05); setTimeout(() => this.playTone(1318.51, 'square', 0.3, 0.05), 80); },
        playError() { this.playTone(150, 'sawtooth', 0.4, 0.1); },
        playReset() { this.playTone(880, 'sine', 0.1, 0.05); setTimeout(() => this.playTone(440, 'sine', 0.3, 0.05), 100); },
        playFlip() { 
            this.init(); 
            const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(880, this.ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime); gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
            osc.connect(gain); gain.connect(this.ctx.destination); osc.start(); osc.stop(this.ctx.currentTime + 0.5);
        },
        playOverdriveJingle() {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((f, i) => setTimeout(() => this.playTone(f, 'square', 0.2, 0.05), i * 150));
        }
    };

    // --- MÓDULO: EFFECTS MANAGER ---
    const EffectsManager = {
        activeTimers: new Map(),
        resetBtn: null,

        init() {
            this.resetBtn = document.getElementById('reset-effects-btn');
            if (this.resetBtn) {
                this.resetBtn.addEventListener('click', () => this.resetAll());
            }
        },

        updateResetButton() {
            const hasEffects = document.body.className.split(' ').some(c => ['overdrive', 'dark-doom', 'noclip', 'flipped'].includes(c)) || 
                               document.querySelector('.matrix-canvas') || 
                               document.querySelector('.cheat-banner');
            if (this.resetBtn) {
                this.resetBtn.hidden = !hasEffects;
                this.resetBtn.classList.toggle('visible', hasEffects);
            }
        },

        setEffect(className, duration) {
            document.body.classList.add(className);
            this.clearTimer(className);
            if (duration) {
                const timer = setTimeout(() => {
                    document.body.classList.remove(className);
                    this.updateResetButton();
                }, duration);
                this.activeTimers.set(className, timer);
            }
            this.updateResetButton();
        },

        clearTimer(name) {
            if (this.activeTimers.has(name)) {
                clearTimeout(this.activeTimers.get(name));
                this.activeTimers.delete(name);
            }
        },

        resetAll() {
            AudioEngine.playReset();
            ['overdrive', 'dark-doom', 'noclip', 'flipped'].forEach(c => document.body.classList.remove(c));
            this.activeTimers.forEach(t => clearTimeout(t));
            this.activeTimers.clear();
            const canvas = document.querySelector('.matrix-canvas');
            if (canvas) canvas.remove();
            document.querySelectorAll('.cheat-banner, .confetti-piece').forEach(el => el.remove());
            this.updateResetButton();
        },

        showBanner(text, duration = 3000) {
            const banner = document.createElement('div');
            banner.className = 'cheat-banner';
            banner.textContent = text;
            document.body.appendChild(banner);
            this.updateResetButton();
            setTimeout(() => { banner.remove(); this.updateResetButton(); }, duration);
        },

        createConfetti(duration = 8000) {
            const emojis = ['🎮', '🕹️', '👾', '⭐', '💎'];
            const container = document.createElement('div');
            container.className = 'confetti-container';
            document.body.appendChild(container);
            const interval = setInterval(() => {
                const p = document.createElement('div');
                p.className = 'confetti-piece';
                p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animationDuration = (Math.random() * 3 + 2) + 's';
                container.appendChild(p);
                setTimeout(() => p.remove(), 5000);
            }, 150);
            setTimeout(() => { clearInterval(interval); setTimeout(() => container.remove(), 5000); }, duration);
        },

        startMatrix(duration = 10000) {
            if (document.querySelector('.matrix-canvas')) return;
            const canvas = document.createElement('canvas');
            canvas.className = 'matrix-canvas';
            document.body.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";
            const fontSize = 16; const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);
            const draw = () => {
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#0F0"; ctx.font = fontSize + "px monospace";
                for (let i = 0; i < drops.length; i++) {
                    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
            };
            const interval = setInterval(draw, 33);
            this.updateResetButton();
            setTimeout(() => { clearInterval(interval); canvas.classList.add('fade-out'); setTimeout(() => { canvas.remove(); this.updateResetButton(); }, 1000); }, duration);
        }
    };

    // --- MÓDULO: CHEAT CONSOLE ---
    const CheatConsole = {
        isOpen: false,
        el: null,
        overlay: null,
        inputArea: null,

        init() {
            const div = document.createElement('div');
            div.className = 'cheat-console';
            div.id = 'cheat-console';
            div.innerHTML = `
                <div class="console-header">🕹️ GAMEVAULT CHEAT CONSOLE v1.0</div>
                <div class="console-body">
                    <div class="input-row">INPUT ACTUAL: <div id="console-input-badges" class="badges-container"></div></div>
                    <div class="commands-grid">
                        <div class="cmd">↑↑↓↓←→←→BA <span>OVERDRIVE [15s]</span></div>
                        <div class="cmd">IDKFA <span>DOOM [20s]</span></div>
                        <div class="cmd">NOCLIP <span>GHOST [15s]</span></div>
                        <div class="cmd">GODMODE <span>CONFETTI [8s]</span></div>
                        <div class="cmd">IDDQD <span>FLIP [TOGGLE]</span></div>
                        <div class="cmd">MATRIX <span>MATRIX [10s]</span></div>
                    </div>
                </div>
            `;
            this.overlay = document.createElement('div');
            this.overlay.className = 'console-overlay';
            this.overlay.addEventListener('click', () => this.close());
            
            document.body.appendChild(this.overlay);
            document.body.appendChild(div);
            this.el = div;
            this.inputArea = div.querySelector('#console-input-badges');
        },

        toggle() { this.isOpen ? this.close() : this.open(); },
        open() {
            this.isOpen = true;
            this.el.classList.add('open');
            this.overlay.classList.add('visible');
            AudioEngine.playCoin();
        },
        close() {
            this.isOpen = false;
            this.el.classList.remove('open');
            this.overlay.classList.remove('visible');
        },

        updateBadges(buffer, status = 'neutral') {
            this.inputArea.innerHTML = '';
            buffer.forEach(key => {
                const b = document.createElement('span');
                b.className = `key-badge ${status}`;
                b.textContent = this.formatKey(key);
                this.inputArea.appendChild(b);
            });
        },

        formatKey(key) {
            const map = { 'arrowup': '↑', 'arrowdown': '↓', 'arrowleft': '←', 'arrowright': '→' };
            return map[key] || key.toUpperCase();
        }
    };

    // --- MÓDULO: CHEAT ENGINE ---
    const CheatEngine = {
        buffer: [],
        maxSize: 10,
        konami: "arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a",

        init() {
            window.addEventListener('keydown', (e) => {
                if (e.key === '~' || e.key === '`') { e.preventDefault(); CheatConsole.toggle(); return; }
                if (e.key === 'Escape' && CheatConsole.isOpen) { CheatConsole.close(); return; }
                
                if (CheatConsole.isOpen) {
                    const key = e.key.toLowerCase();
                    if (key.length > 1 && !key.startsWith('arrow')) return;
                    this.buffer.push(key);
                    if (this.buffer.length > this.maxSize) this.buffer.shift();
                    CheatConsole.updateBadges(this.buffer);
                    this.check();
                }
            });
            this.setupLogo();
        },

        check() {
            const seq = this.buffer.join(',');
            const text = this.buffer.join('');
            let found = true;

            if (seq.includes(this.konami)) { EffectsManager.setEffect('overdrive', 15000); AudioEngine.playOverdriveJingle(); EffectsManager.showBanner("OVERDRIVE ACTIVATED"); }
            else if (text.includes('idkfa')) { EffectsManager.setEffect('dark-doom', 20000); AudioEngine.playPowerUp(); }
            else if (text.includes('noclip')) { EffectsManager.setEffect('noclip', 15000); AudioEngine.playPowerUp(); }
            else if (text.includes('godmode')) { EffectsManager.createConfetti(8000); AudioEngine.playPowerUp(); EffectsManager.showBanner("GOD MODE ON"); }
            else if (text.includes('iddqd')) { document.body.classList.toggle('flipped'); AudioEngine.playFlip(); EffectsManager.updateResetButton(); }
            else if (text.includes('matrix')) { EffectsManager.startMatrix(10000); AudioEngine.playPowerUp(); }
            else if (text.includes('howdoi')) { EffectsManager.showBanner("DEV: GAMEVAULT TEAM 2026", 10000); AudioEngine.playPowerUp(); }
            else { found = false; }

            if (found) {
                CheatConsole.updateBadges(this.buffer, 'success');
                setTimeout(() => { this.buffer = []; CheatConsole.updateBadges(this.buffer); }, 500);
            } else if (this.buffer.length === this.maxSize) {
                // Si llegamos al máximo y no hay match, parpadear error
                // Para simplificar, solo si el buffer está lleno y no hay match parcial posible (esto es un poco complejo, así que parpadeamos si no hay match al llenar)
                // Implementación simple: si el buffer está lleno, es un potencial error
                // Pero mejor: si el usuario sigue escribiendo y no hay nada.
            }
        },

        setupLogo() {
            const logo = document.querySelector('h1.glitch');
            let clicks = 0;
            if (logo) {
                logo.addEventListener('click', () => {
                    clicks++;
                    if (clicks >= 10) {
                        AudioEngine.playPowerUp();
                        logo.classList.add('mega-glitch');
                        setTimeout(() => logo.classList.remove('mega-glitch'), 3000);
                        EffectsManager.showBanner("PIXEL EXPLOSION!");
                        clicks = 0;
                    }
                });
            }
        }
    };

    return {
        init() {
            CheatConsole.init();
            CheatEngine.init();
            EffectsManager.init();
            console.log("🕹️ GameVault Pro Cheats Ready. Press ~ to open.");
        }
    };
})();

window.Cheats = Cheats;
