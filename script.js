document.addEventListener('DOMContentLoaded', () => {
    // Create simplified UI elements
    document.body.innerHTML = `
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f0f2f5;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
            }
            
            #doc__wrapper {
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                width: 100%;
                max-width: 500px;
                padding: 30px;
                box-sizing: border-box;
            }
            
            #title {
                text-align: center;
                font-size: 28px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 20px;
            }
            
            #content__wrapper {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            #banner {
                text-align: center;
                margin-bottom: 15px;
            }
            
            #banner img {
                border-radius: 8px;
                max-width: 100%;
                height: auto;
            }
            
            .platform__wrapper, .pair__wrapper {
                width: 100%;
            }
            
            select {
                width: 100%;
                padding: 12px 15px;
                border-radius: 6px;
                border: 1px solid #ddd;
                background-color: white;
                font-size: 16px;
                margin-bottom: 15px;
                box-sizing: border-box;
            }
            
            #trade__wrapper {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            #signal {
                background: #3498db;
                color: white;
                border: none;
                padding: 15px;
                border-radius: 6px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            #signal:hover {
                background: #2980b9;
            }
            
            #center {
                text-align: center;
                margin-top: 20px;
            }
            
            #result {
                background: #95a5a6;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 6px;
                font-size: 18px;
                margin-top: 20px;
                display: inline-block;
                min-width: 200px;
            }
            
            .rem__time {
                text-align: center;
                font-size: 14px;
                color: #7f8c8d;
            }
        </style>
        
        <div id="doc__wrapper">
            <div id="title">YQT BOT PRO</div>
            <div id="content__wrapper">
                <div id="banner">
                    <img src="https://via.placeholder.com/200x100/3498db/ffffff?text=YQT+BOT" alt="YQT Bot" width="200">
                </div>
                <div class="platform__wrapper">
                    <select id="platform__box" class="platform__select">
                        <option value="q">QUOTEX</option>
                        <option value="p">POCKET OPTION</option>
                        <option value="b">BINOMO</option>
                        <option value="o">OLYMP</option>
                        <option value="i">IQ OPTION</option>
                        <option value="e">EXPERT OPTION</option>
                    </select>
                </div>
                <div class="pair__wrapper">
                    <select id="pair__box" class="pair__select">
                        <option value="eur/usd">EUR/USD</option>
                        <option value="gbp/usd">GBP/USD</option>
                        <option value="usd/jpy">USD/JPY</option>
                        <option value="btc/usd">BTC/USD</option>
                        <option value="eth/usd">ETH/USD</option>
                    </select>
                    <select id="time__box" class="time__select">
                        <option value="5s">5 Seconds</option>
                        <option value="10s">10 Seconds</option>
                        <option value="15s">15 Seconds</option>
                        <option value="30s">30 Seconds</option>
                        <option selected value="1m">1 Minute</option>
                        <option value="2m">2 Minutes</option>
                        <option value="5m">5 Minutes</option>
                    </select>
                </div>
                <div id="trade__wrapper">
                    <button id="signal">GET SIGNAL</button>
                    <div class="rem__time">Ready to generate signals</div>
                </div>
                <div id="center">
                    <div id="result">Signal will appear here</div>
                </div>
            </div>
        </div>
    `;

    // Signal generation functionality
    document.getElementById('signal').addEventListener('click', function() {
        const signalBtn = this;
        const remTime = document.querySelector('.rem__time');
        const resultDiv = document.getElementById('result');
        
        // Disable button during processing
        signalBtn.disabled = true;
        signalBtn.textContent = 'PROCESSING...';
        remTime.textContent = 'Analyzing market data...';
        resultDiv.textContent = 'Calculating...';
        resultDiv.style.background = '#95a5a6';
        
        // Simulate processing delay
        setTimeout(() => {
            const directions = ['CALL', 'PUT'];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            
            // Update result
            resultDiv.textContent = direction;
            resultDiv.style.background = direction === 'CALL' ? '#2ecc71' : '#e74c3c';
            
            // Show success message
            remTime.textContent = `Signal generated at: ${new Date().toLocaleTimeString()}`;
            
            // Re-enable button
            signalBtn.disabled = false;
            signalBtn.textContent = 'GET SIGNAL';
            
            // Add notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFfXl4eHl8f4WIi42PkZOVmJqcnZ+hoqOkpaanqKipqqusrK2ur7CxsrO0tba3uLi5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/');
            audio.play().catch(e => console.log('Audio play prevented:', e));
        }, 2000);
    });
});
