'use client';

import { useState } from 'react';

export default function Page() {
  // 실제로는 Python 백엔드에서 계산된 데이터를 fetch로 받아오게 됩니다.
  // 지금은 더미 데이터(Mock Data)로 화면을 구성합니다.
  // 테스트 용 데이터
  const [rankings, setRankings] = useState([
    { id: 1, user1: '김철수', user2: '이영희', score: 98, comment: '천생연분' },
    { id: 2, user1: '박서준', user2: '김다미', score: 95, comment: '운명의 짝' },
    { id: 3, user1: '이도현', user2: '고민시', score: 91, comment: '환상의 케미' },
    { id: 4, user1: '공유', user2: '김고은', score: 88, comment: '아주 좋아요' },
    { id: 5, user1: '최우식', user2: '김다미', score: 85, comment: '좋은 인연' },
    { id: 6, user1: '손석구', user2: '김지원', score: 79, comment: '노력하면 극복' },
    { id: 7, user1: '정해인', user2: '지수', score: 72, comment: '보통의 연애' },
  ]);

  

  // 순위 아이콘/색상 결정 함수
  const getRankBadge = (index) => {
    switch (index) {
      case 0: // 1등
        return <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">GOLD</span>;
      case 1: // 2등
        return <span className="bg-gray-300 text-gray-700 text-xs font-bold px-2 py-1 rounded-full shadow">SILVER</span>;
      case 2: // 3등
        return <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">BRONZE</span>;
      default: // 그 외
        return <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">{index + 1}위</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* 헤더 영역 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Soulmatch 명예의 전당</h1>
          <p className="text-gray-500">최고의 궁합 점수를 기록한 커플들을 확인하세요!</p>
        </div>

        {/* 랭킹 리스트 영역 */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {rankings.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center justify-between p-5 border-b border-gray-100 hover:bg-purple-50 transition-colors last:border-0 ${index < 3 ? 'bg-yellow-50/30' : ''}`}
            >
              {/* 왼쪽: 순위 및 이름 */}
              <div className="flex items-center gap-4">
                <div className="w-16 flex justify-center">
                  {getRankBadge(index)}
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    {item.user1} <span className="text-pink-400 text-sm">♥</span> {item.user2}
                  </div>
                  <span className="text-xs text-gray-400">{item.comment}</span>
                </div>
              </div>

              {/* 오른쪽: 점수 */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-2xl font-bold text-purple-600">{item.score}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Score</span>
                </div>
                
                {/* 점수 게이지 바 (시각적 효과) */}
                <div className="hidden sm:block w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}