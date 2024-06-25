// import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// export const appwriteConfig = {
//     url: import.meta.env.VITE_APPWRITE_URL,
//     projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
//     databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
//     userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
//     postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
//     savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
// }

// export const client = new Client();

// client.setEndpoint(appwriteConfig.url);
// client.setProject(appwriteConfig.projectId);

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export const avatars = new Avatars(client);

import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// Appwrite configuration
export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL as string,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID as string,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID as string,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID as string,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID as string,
};

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// Optional: Log configuration for debugging
console.log("Appwrite Config:", appwriteConfig);