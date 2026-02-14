import { useEffect, useState } from "react";
import "./App.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};
interface HeartStyle {
  id: number;
  left: string;
  duration: string;
}

const ValentineConfetti: React.FC = () => {
  const [hearts, setHearts] = useState<HeartStyle[]>([]);
  const name = getQueryParam("name") || null;
  const isFemale = getQueryParam("gender") === "F" || false
  const showForm = !name;
  const [formName, setFormName] = useState<string>('')
  const [gender, setGender] = useState<string>('M')
  const [showAlert, setShowAlert] = useState<boolean>(false);
  
  useEffect(() => {
    const initialHearts = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      duration: Math.random() * 2 + 2 + "s"
    }));
    setHearts(initialHearts);
    const incrementVisitCount = async () => {
      const visitRef = doc(db, "stats", "visits");

      try {
        const visitSnap = await getDoc(visitRef);
        if (visitSnap.exists()) {
          await updateDoc(visitRef, {
            count: visitSnap.data().count + 1,
          });
        } else {
          await setDoc(visitRef, { count: 1 });
        }
      } catch (error) {
        console.error("Error updating visit count:", error);
      }
    };

    incrementVisitCount();
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/?name=${encodeURIComponent(formName)}&gender=${encodeURIComponent(gender)}`;
    navigator.clipboard.writeText(url);
    setShowAlert(true);
    
    const incrementVisitCount = async () => {
      const visitRef = doc(db, "stats", "newNameCount");

      try {
        const visitSnap = await getDoc(visitRef);
        if (visitSnap.exists()) {
          await updateDoc(visitRef, {
            count: visitSnap.data().count + 1,
          });
        } else {
          await setDoc(visitRef, { count: 1 });
        }
      } catch (error) {
        console.error("Error updating visit count:", error);
      }
    };

    incrementVisitCount();
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="valentine-container">
      <div className="card-container">
        {showForm? (
          <>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-card">
              <input
                type="text"
                placeholder="اسم الحب"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="input"
              />
              <div className="gender-selection">
                <label>
                  <input
                    type="radio"
                    value="M"
                    checked={gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio"
                  />
                  💙 ذكر
                </label>
                <label>
                  <input
                    type="radio"
                    value="F"
                    checked={gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio"
                  />
                  💖 انثى
                </label>
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={!formName}>
              نسخ الرابط
            </button>
          </form>
          </>
        ): (
          <div className="card">
            <h1>كل عام و {isFemale? 'انتي' : "انت"} حبي {name}</h1>
            <div className="message">وجودك بحياتي هو أحلى هدية من الدنيا. ❤️🎁</div>
          </div>
        )}
      </div>
      <div className="heart-container">
        {hearts.map((heart) => (
            <div
              key={heart.id}
              className="heart"
              style={{
                left: heart.left,
                animationDuration: heart.duration,
              }}
            />
          ))}
      </div>
      <div className="message-alert-container">
        <div className={`message-alert ${showAlert ? 'active' : ''}`}>
          {gender === 'F'? 'تمام يا حلوة دزيلة الرابط و سلميلنة علية 🌚👍':'تمام يا حلو دزلها الرابط و سلمنة عليها 🌚👍' }
        </div>
      </div> 
    </div>
  );
};

export default ValentineConfetti;
