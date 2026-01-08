import { JWT } from "google-auth-library"
import { GoogleSpreadsheet } from "google-spreadsheet";

// Hàm cũ của bạn (GIỮ NGUYÊN - KHÔNG SỬA)
export const getSheet = async () => {
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo();
    return doc.sheetsByIndex[0];
}

// VIẾT THÊM: Hàm lấy sheet theo tên tab để dùng cho Contact
export const getSheetByTitle = async (title: string) => {
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo();
    return doc.sheetsByTitle[title];
}