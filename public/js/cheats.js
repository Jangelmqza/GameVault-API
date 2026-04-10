/**
 * public/js/cheats.js
 * Módulo de Easter Eggs, Cheat Console y Efectos Visuales/Sonoros
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
        playPowerUp() {
            this.playTone(440, 'square', 0.1, 0.05);
            setTimeout(() => this.playTone(660, 'square', 0.1, 0.05), 100);
            setTimeout(() => this.playTone(880, 'square', 0.2, 0.05), 200);
        },
        playCoin() {
            this.playTone(987.77, 'square', 0.1, 0.05);
            setTimeout(() => this.playTone(1318.51, 'square', 0.4, 0.05), 100);
        },
        playBuzzer() {
            this.playTone(150, 'sawtooth', 0.3, 0.1);
        },
        playFlip() {
            this.init();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(880, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.5);
        }
    };

    // --- MÓDULO: EFFECTS MANAGER ---
    const EffectsManager = {
        activeTimers: {},
        
        toggleOverdrive() {
            document.body.classList.toggle('overdrive');
            if (document.body.classList.contains('overdrive')) {
                AudioEngine.playPowerUp();
                this.showBanner("OVERDRIVE ACTIVATED");
            }
        },
        toggleDoom() {
            document.body.classList.toggle('dark-doom');
            AudioEngine.playBuzzer();
        },
        toggleNoclip() {
            document.body.classList.toggle('noclip');
            AudioEngine.playTone(300, 'sine', 0.5, 0.1);
        },
        toggleGodMode() {
            AudioEngine.playCoin();
            this.createConfetti();
            this.showBanner("GOD MODE ON");
        },
        toggleFlip() {
            document.body.classList.toggle('flipped');
            AudioEngine.playFlip();
        },
        showCredits() {
            AudioEngine.playPowerUp();
            this.showBanner("DEVELOPED BY GAMEVAULT TEAM - 2026", 5000);
        },
        startMatrix() {
            if (document.querySelector('.matrix-canvas')) return;
            const canvas = document.createElement('canvas');
            canvas.className = 'matrix-canvas';
            document.body.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";
            const fontSize = 16;
            const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            const draw = () => {
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#0F0";
                ctx.font = fontSize + "px monospace";
                for (let i = 0; i < drops.length; i++) {
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
            };
            const interval = setInterval(draw, 33);
            setTimeout(() => {
                clearInterval(interval);
                canvas.remove();
            }, 10000);
        },
        showBanner(text, duration = 3000) {
            const banner = document.createElement('div');
            banner.className = 'cheat-banner';
            banner.textContent = text;
            document.body.appendChild(banner);
            setTimeout(() => banner.remove(), duration);
        },
        createConfetti() {
            const emojis = ['🎮', '🕹️', '👾', '⭐', '💎'];
            for (let i = 0; i < 50; i++) {
                const p = document.createElement('div');
                p.className = 'confetti-piece';
                p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animationDuration = (Math.random() * 3 + 2) + 's';
                p.style.fontSize = (Math.random() * 20 + 20) + 'px';
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 5000);
            }
        }
    };

    // --- MÓDULO: CHEAT CONSOLE (UI) ---
    const CheatConsole = {
        isOpen: false,
        el: null,
        inputDisplay: null,
        
        init() {
            const div = document.createElement('div');
            div.className = 'cheat-console';
            div.innerHTML = `
                <div class="console-header">GAMEVAULT DEBUG CONSOLE v1.0</div>
                <div class="console-body">
                    <div class="input-line">> <span id="console-input"></span><span class="cursor">_</span></div>
                    <div class="commands-list">
                        COMANDOS DISPONIBLES:<br>
                        ↑↑↓↓←→←→BA — OVERDRIVE<br>
                        IDKFA      — MODO DOOM<br>
                        NOCLIP     — FANTASMA<br>
                        GODMODE    — CONFETTI<br>
                        IDDQD      — FLIP SCREEN<br>
                        HOWDOI     — CREDITOS<br>
                        MATRIX     — MATRIX RAIN
                    </div>
                </div>
            `;
            document.body.appendChild(div);
            this.el = div;
            this.inputDisplay = document.getElementById('console-input');
        },
        toggle() {
            this.isOpen = !this.isOpen;
            this.el.classList.toggle('open', this.isOpen);
            if (this.isOpen) AudioEngine.playTone(600, 'square', 0.1, 0.05);
        },
        updateInput(buffer) {
            if (this.inputDisplay) {
                this.inputDisplay.textContent = buffer.join(' ').toUpperCase();
            }
        }
    };

    // --- MÓDULO: CHEAT ENGINE (Lógica) ---
    const CheatEngine = {
        buffer: [],
        maxBufferSize: 20,
        konami: "arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a",
        
        init() {
            window.addEventListener('keydown', (e) => this.handleKey(e));
            this.setupLogoSecret();
        },
        
        handleKey(e) {
            const key = e.key.toLowerCase();
            
            // Abrir/Cerrar Consola
            if (key === '`' || key === '~') {
                e.preventDefault();
                CheatConsole.toggle();
                return;
            }

            this.buffer.push(key);
            if (this.buffer.length > this.maxBufferSize) this.buffer.shift();
            
            CheatConsole.updateInput(this.buffer);
            this.checkCheats();
        },
        
        checkCheats() {
            const sequence = this.buffer.join(',');
            const text = this.buffer.join('');

            if (sequence.includes(this.konami)) {
                EffectsManager.toggleOverdrive();
                this.clearBuffer();
            } else if (text.includes('idkfa')) {
                EffectsManager.toggleDoom();
                this.clearBuffer();
            } else if (text.includes('noclip')) {
                EffectsManager.toggleNoclip();
                this.clearBuffer();
            } else if (text.includes('godmode')) {
                EffectsManager.toggleGodMode();
                this.clearBuffer();
            } else if (text.includes('iddqd')) {
                EffectsManager.toggleFlip();
                this.clearBuffer();
            } else if (text.includes('howdoi')) {
                EffectsManager.showCredits();
                this.clearBuffer();
            } else if (text.includes('matrix')) {
                EffectsManager.startMatrix();
                this.clearBuffer();
            }
        },
        
        clearBuffer() {
            this.buffer = [];
            CheatConsole.updateInput(this.buffer);
        },

        setupLogoSecret() {
            const logo = document.querySelector('h1.glitch');
            let clicks = 0;
            if (logo) {
                logo.addEventListener('click', () => {
                    clicks++;
                    if (clicks >= 10) {
                        AudioEngine.playPowerUp();
                        logo.style.animation = 'glitch-anim 0.1s infinite';
                        setTimeout(() => {
                            logo.style.animation = '';
                            clicks = 0;
                        }, 2000);
                        EffectsManager.showBanner("SECRET UNLOCKED: GLITCH OVERLOAD");
                    }
                });
            }
        }
    };

    return {
        init() {
            CheatConsole.init();
            CheatEngine.init();
            console.log("🕹️ GameVault Cheats Initialized. Press ` to open console.");
        }
    };
})();

window.Cheats = Cheats;
