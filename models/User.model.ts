import { RowDataPacket } from 'mysql2';
import pool from '../config/db.config';

export interface User extends RowDataPacket {
  id: number;
  fullName: string;
  gender: string;
  state: string;
  lga: string;
  ward: string;
  pollingUnit: string;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  nin: string;
  votersCard: string;
  bvn: string;
  ninDocument?: string;
  votersCardDocument?: string;
  bvnDocument?: string;
  password: string;
  agreedToTerms: boolean;
  receiveUpdates?: boolean;
  isVerified: boolean;
}

export const UserModel = {
  async create(user: Omit<User, 'id'>): Promise<number> {
    // Build query dynamically based on provided fields
    const fields = Object.keys(user).filter(key => user[key as keyof typeof user] !== undefined);
    const values = fields.map(field => user[field as keyof typeof user]);
    
    const placeholders = fields.map(() => '?').join(', ');
    const columns = fields.join(', ');
    
    const [result] = await pool.query(
      `INSERT INTO users (${columns}) VALUES (${placeholders})`,
      values
    );

    return (result as any).insertId;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const [rows] = await pool.query<User[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  async findById(id: number): Promise<User | undefined> {
    const [rows] = await pool.query<User[]>(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  async verifyEmail(userId: number): Promise<void> {
    await pool.query(
      `UPDATE users SET isVerified = true WHERE id = ?`,
      [userId]
    );
  }
};