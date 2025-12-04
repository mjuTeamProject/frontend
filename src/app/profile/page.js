'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 수정 모드 상태
    const [editMode, setEditMode] = useState({ nickname: false, email: false });
    const [tempInput, setTempInput] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // 백엔드: GET /api/users/me
                const response = await api.get('/users/me');
                setUser(response.data);
            } catch (error) {
                console.error("프로필 로딩 실패", error);
                alert("로그인이 필요한 페이지입니다.");
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    // 수정 버튼 클릭 핸들러
    const handleEditClick = (field) => {
        setEditMode({ ...editMode, [field]: true });
        setTempInput({ ...tempInput, [field]: user[field] || '' });
    };

    // 취소 버튼 클릭 핸들러
    const handleCancel = (field) => {
        setEditMode({ ...editMode, [field]: false });
    };

    // 저장 버튼 클릭 핸들러
    const handleSave = async (field) => {
        try {
            // 백엔드 스키마: UserUpdate { nickname?: str, email?: str }
            const payload = { [field]: tempInput[field] };

            // PUT /api/users/me
            const response = await api.put('/users/me', payload);

            // 응답값으로 상태 업데이트
            setUser(response.data);
            setEditMode({ ...editMode, [field]: false });
        } catch (error) {
            console.error("수정 실패", error);
            alert("정보 수정에 실패했습니다: " + (error.response?.data?.detail || "알 수 없는 오류"));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c2c86]"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                    프로필 관리
                </h1>

                <div className="space-y-6">

                    {/* --- 아이디 (수정 불가) --- */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-500 mb-1">아이디</label>
                        <div className="flex items-center h-10">
                            <span className="text-gray-800 text-lg font-medium">{user.username}</span>
                        </div>
                    </div>

                    {/* --- 닉네임 (수정 가능) --- */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-500 mb-1">닉네임</label>
                        <div className="flex items-center justify-between h-10">
                            {editMode.nickname ? (
                                <>
                                    <input
                                        type="text"
                                        value={tempInput.nickname}
                                        onChange={(e) => setTempInput({ ...tempInput, nickname: e.target.value })}
                                        className="flex-1 border border-blue-400 rounded px-2 py-1 mr-2 focus:outline-none"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={() => handleSave('nickname')} className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">저장</button>
                                        <button onClick={() => handleCancel('nickname')} className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition">취소</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-800 text-lg">{user.nickname}</span>
                                    <button
                                        onClick={() => handleEditClick('nickname')}
                                        className="text-xs text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-50 transition"
                                    >
                                        변경
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- 이메일 (수정 가능) --- */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-500 mb-1">이메일</label>
                        <div className="flex items-center justify-between h-10">
                            {editMode.email ? (
                                <>
                                    <input
                                        type="email"
                                        value={tempInput.email}
                                        onChange={(e) => setTempInput({ ...tempInput, email: e.target.value })}
                                        className="flex-1 border border-blue-400 rounded px-2 py-1 mr-2 focus:outline-none"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={() => handleSave('email')} className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">저장</button>
                                        <button onClick={() => handleCancel('email')} className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition">취소</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className={`text-lg ${user.email ? 'text-gray-600' : 'text-gray-400 italic'}`}>
                                        {user.email || '이메일 없음'}
                                    </span>
                                    <button
                                        onClick={() => handleEditClick('email')}
                                        className="text-xs text-blue-500 hover:text-blue-700 font-medium border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-50 transition"
                                    >
                                        변경
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- 회원 가입일 (읽기 전용) --- */}
                    <div className="flex flex-col mt-4 pt-4 border-t">
                        <label className="text-xs font-semibold text-gray-400 mb-1">가입일</label>
                        <span className="text-xs text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()} {new Date(user.created_at).toLocaleTimeString()}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}