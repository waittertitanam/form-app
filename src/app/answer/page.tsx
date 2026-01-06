"use client";

import { useState, useEffect } from "react";

interface FormAnswer {
  id?: number;
  firstName?: string;
  lastName?: string;
  idNumber?: string;
  name?: string;
}

export default function AnswerPage() {
  const [answers, setAnswers] = useState<FormAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/form");
      if (!response.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลได้");
      }
      const data = await response.json();
      setAnswers(data);
      setError(null);
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      console.error("Failed to fetch answers", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              คำตอบทั้งหมดจากแบบสอบถาม
            </h1>
            <button
              onClick={fetchAnswers}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              รีเฟรช
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={fetchAnswers}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ลองอีกครั้ง
              </button>
            </div>
          ) : answers.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">ยังไม่มีคำตอบ</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ลำดับ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ชื่อ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      นามสกุล
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      เลขที่
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((answer, index) => (
                    <tr
                      key={answer.id || index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-700">
                        {answer.id || index + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {answer.firstName || answer.name || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {answer.lastName || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {answer.idNumber || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-sm text-gray-600">
                รวมทั้งหมด {answers.length} รายการ
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

