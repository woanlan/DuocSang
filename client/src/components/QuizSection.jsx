import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RefreshCw, Sparkles, ChevronRight, HelpCircle, Flame, Sprout } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizSection({ quizData = [] }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  if (!quizData || quizData.length === 0) return null;

  const currentQ = quizData[currentQuestionIdx];

  const handleSelectOption = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      selected: index,
      isCorrect: isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizCompleted(false);
    setUserAnswers([]);
  };

  const getRankBadge = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) {
      return {
        title: "Bậc Thầy Sử Học - Ngọn Đuốc Sáng Truyền Thống",
        desc: "Xuất sắc tuyệt đối! Bạn nắm rất vững cuộc đời và sự nghiệp cứu nước vẻ vang của Bác Hồ kính yêu.",
        icon: <Award className="w-10 h-10 text-amber-300 drop-shadow-md animate-pulse" />
      };
    } else if (percentage >= 70) {
      return {
        title: "Tự Hào Tuổi Trẻ Việt Nam",
        desc: "Rất tốt! Bạn có sự hiểu biết sâu sắc và tình cảm nồng nàn hướng về Bác.",
        icon: <Sparkles className="w-10 h-10 text-amber-300 drop-shadow-md" />
      };
    } else {
      return {
        title: "Hạt Giống Đầy Tiềm Năng",
        desc: "Khá tốt! Hãy khám phá thêm các mẩu chuyện trên Đuốc Sáng để trau dồi tri thức lịch sử nhé.",
        icon: <Sprout className="w-10 h-10 text-amber-300 drop-shadow-md" />
      };
    }
  };

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-[#160e08] via-[#20140b] to-[#160e08] border-t border-b border-amber-900/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>MINI GAME LỊCH SỬ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#f5efe6] tracking-tight">
            Thử Thách Tri Thức Lịch Sử
          </h2>
          <p className="text-stone-300/80 mt-3 text-sm sm:text-base font-serif">
            Cùng ôn lại những dấu mốc thiêng liêng và kiến thức về cuộc đời, hành trình cứu nước của Bác
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="duocsang-card rounded-3xl p-6 sm:p-10 border border-amber-800/40 relative overflow-hidden">
          
          {!isQuizCompleted ? (
            <div>
              {/* Progress Header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-amber-900/40 text-xs sm:text-sm font-semibold text-stone-300">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/50">
                    Câu hỏi {currentQuestionIdx + 1} / {quizData.length}
                  </span>
                </div>
                <div>
                  Điểm của bạn: <span className="font-serif font-bold text-amber-400 text-base">{score}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#180f08] h-2 rounded-full mb-8 overflow-hidden border border-amber-950">
                <div 
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / quizData.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#f5efe6] mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options list */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = "bg-[#1f130b] hover:bg-[#2c1b10] text-stone-200 border-amber-900/40";
                  
                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "bg-emerald-950/80 text-emerald-200 border-emerald-500 ring-2 ring-emerald-500/30 font-bold";
                    } else if (idx === selectedOption) {
                      btnStyle = "bg-rose-950/80 text-rose-200 border-rose-500 ring-2 ring-rose-500/30";
                    } else {
                      btnStyle = "opacity-40 bg-[#160d07] text-stone-500 border-stone-800";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <span className="w-7 h-7 rounded-full bg-[#2a1a10] border border-amber-800/60 flex items-center justify-center text-xs font-bold shrink-0 text-amber-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#1a1009] border border-amber-800/50 mb-6 animate-fadeIn">
                  <div className="flex items-start space-x-2.5">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                        Giải thích lịch sử:
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-full duocsang-btn text-amber-100 font-semibold flex items-center space-x-2 shadow-lg"
                  >
                    <span>{currentQuestionIdx < quizData.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Result Certificate Screen */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#2c1b10] border-2 border-amber-500 flex items-center justify-center text-4xl shadow-xl">
                {getRankBadge(score, quizData.length).icon}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5efe6]">
                  Hoàn Thành Thử Thách!
                </h3>
                <p className="text-stone-300 text-sm sm:text-base mt-2">
                  Bạn đã trả lời đúng <strong className="text-amber-400 text-xl font-serif">{score}</strong> / {quizData.length} câu hỏi
                </p>
              </div>

              {/* Badge Certificate */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#1b1008] border border-amber-700/60 shadow-md text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  DANH HIỆU VINH DANH
                </span>
                <h4 className="font-serif font-bold text-xl text-amber-200 mt-2">
                  {getRankBadge(score, quizData.length).title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed font-serif">
                  {getRankBadge(score, quizData.length).desc}
                </p>
              </div>

              <div className="flex justify-center pt-3">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-full duocsang-btn text-amber-100 font-semibold shadow-lg flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Chơi Lại Mini Game</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
