'use client';

import { useState } from 'react';

export default function ProfilePage() {
  // 1. 사용자 정보 상태
  const [user, setUser] = useState({
    id: 'soul_master',
    username: '운명개척자',
    email: 'destiny@soulmatch.com',
    password: 'password123',
  });

  // 2. 수정 모드 상태 관리
  const [editMode, setEditMode] = useState({
    id: false,
    password: false,
  });

  // 3. 입력값 임시 저장
  const [tempInput, setTempInput] = useState({
    id: user.id,
    password: user.password,
  });

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setTempInput({ ...tempInput, [field]: user[field] });
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = (field) => {
    setUser({ ...user, [field]: tempInput[field] });
    setEditMode({ ...editMode, [field]: false });
    console.log(`[API 요청] ${field} 변경됨: ${tempInput[field]}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          프로필 관리
        </h1>

        <div className="space-y-6">
          
          {/* --- 아이디 (수정 가능) --- */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">아이디</label>
            <div className="flex items-center justify-between h-10">
              {editMode.id ? (
                <>
                  <input
                    type="text"
                    value={tempInput.id}
                    onChange={(e) => setTempInput({ ...tempInput, id: e.target.value })}
                    className="flex-1 border border-blue-400 rounded px-2 py-1 mr-2 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleSave('id')} className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">저장</button>
                    <button onClick={() => handleCancel('id')} className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400">취소</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-gray-800 text-lg">{user.id}</span>
                  <button 
                    onClick={() => handleEditClick('id')}
                    className="text-xs text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-50 transition"
                  >
                    변경
                  </button>
                </>
              )}
            </div>
          </div>

          {/* --- 사용자명 (읽기 전용) --- */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">사용자명</label>
            <div className="flex items-center h-10">
              <span className="text-gray-800 text-lg">{user.username}</span>
            </div>
          </div>

          {/* --- 이메일 (읽기 전용) --- */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">이메일</label>
            <div className="flex items-center h-10">
              <span className="text-gray-600">{user.email}</span>
            </div>
          </div>

          {/* --- 비밀번호 (수정 가능, 마스킹 처리) --- */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">비밀번호</label>
            <div className="flex items-center justify-between h-10">
              {editMode.password ? (
                <>
                  <input
                    type="text"
                    value={tempInput.password}
                    onChange={(e) => setTempInput({ ...tempInput, password: e.target.value })}
                    className="flex-1 border border-blue-400 rounded px-2 py-1 mr-2 focus:outline-none"
                    placeholder="새 비밀번호 입력"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleSave('password')} className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">저장</button>
                    <button onClick={() => handleCancel('password')} className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400">취소</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-gray-800 text-lg tracking-widest">
                    {'*'.repeat(user.password.length)}
                  </span>
                  <button 
                    onClick={() => handleEditClick('password')}
                    className="text-xs text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-50 transition"
                  >
                    변경
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}