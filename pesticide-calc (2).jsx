import { useState, useEffect } from "react";

export default function PesticideCalc() {
  const [ratio, setRatio] = useState(500);
  const [volume, setVolume] = useState(10);
  const [result, setResult] = useState(null);
  const [animated, setAnimated] = useState(false);

  function calculate(r, v) {
    if (!r || !v || r <= 0 || v <= 0) { setResult(null); return; }
    const stockL = v / r;
    const stockMl = stockL * 1000;
    const waterL = v - stockL;
    setResult({ stockL, stockMl, waterL });
    setAnimated(false);
    setTimeout(() => setAnimated(true), 10);
  }

  useEffect(() => { calculate(ratio, volume); }, []);

  function handleRatio(e) {
    const v = parseFloat(e.target.value);
    setRatio(v);
    calculate(v, volume);
  }

  function handleVolume(e) {
    const v = parseFloat(e.target.value);
    setVolume(v);
    calculate(ratio, v);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 20px;
          padding: 36px 32px;
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(16px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }

        .title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: #5ec9f0;
          margin: 0 0 4px 0;
          text-transform: uppercase;
        }

        .heading {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 32px 0;
        }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #5ec9f0;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .input-group {
          position: relative;
          margin-bottom: 28px;
        }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          letter-spacing: 2px;
          padding: 16px 80px 16px 20px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #5ec9f0; }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }

        .input-field::-webkit-outer-spin-button,
        .input-field::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .input-field[type=number] { -moz-appearance: textfield; }

        .input-unit {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #5ec9f0;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          pointer-events: none;
        }

        .result-box {
          margin-top: 28px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .result-box.show { opacity: 1; transform: translateY(0); }

        .result-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 0 0 24px 0;
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .result-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #9abccc;
        }

        .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .result-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: #fff;
          letter-spacing: 1px;
        }

        .result-sub {
          font-size: 11px;
          color: #5ec9f0;
          text-align: right;
          margin-bottom: 12px;
        }

        .bar-container {
          height: 8px;
          background: rgba(255,255,255,0.07);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 20px;
        }
        .bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #5ec9f0, #2d9bc9);
          transition: width 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #5a8090;
          margin-top: 5px;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="card">
        <p className="title">Agricultural Tool</p>
        <h1 className="heading">農薬 希釈倍率 計算</h1>

        <div className="section-label">希釈倍率</div>
        <div className="input-group">
          <input
            className="input-field"
            type="number"
            value={ratio}
            min="1"
            placeholder="例：500"
            onChange={handleRatio}
          />
          <span className="input-unit">倍</span>
        </div>

        <div className="section-label">作りたい薬液量</div>
        <div className="input-group">
          <input
            className="input-field"
            type="number"
            value={volume}
            min="0.1"
            step="0.1"
            placeholder="例：10"
            onChange={handleVolume}
          />
          <span className="input-unit">L</span>
        </div>

        {result && (
          <div className={`result-box${animated ? " show" : ""}`}>
            <hr className="result-divider" />

            <div className="result-row">
              <div className="result-label">
                <span className="dot" style={{ background: "#5ec9f0" }}></span>
                原液量
              </div>
              <div className="result-value">{result.stockMl.toFixed(1)} mL</div>
            </div>
            <div className="result-sub">≈ {result.stockL.toFixed(4)} L</div>

            <div className="result-row">
              <div className="result-label">
                <span className="dot" style={{ background: "#2d5f80" }}></span>
                水の量
              </div>
              <div className="result-value">{result.waterL.toFixed(2)} L</div>
            </div>

            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${Math.min((1 / ratio) * 100 * 10, 100)}%` }}
              />
            </div>
            <div className="bar-label">
              <span>原液 {(1 / ratio * 100).toFixed(3)}%</span>
              <span>水 {((ratio - 1) / ratio * 100).toFixed(2)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
