export interface Author {
    id: number | null;
    name: string;
    // Add other properties as needed
}

export interface Book {
    id: number | null;
    name: string;
    author?: string;
    owner_id: number | null;
    pages: number;
    // Add other properties as needed
}
