export interface Document {
    type: string;
    title: string;
    position: number;
}

export interface CardProps {
    document: Document;
}