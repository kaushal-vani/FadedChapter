export interface User {
    _id?: string; // MongoDB's ObjectId as string
    name: string;
    email: string;
    password?: string; // Optional, as you might not always send/receive passwords
    isAdmin?: boolean;
    createdAt?: string; // MongoDB timestamps are stored as strings
    updatedAt?: string;
  }