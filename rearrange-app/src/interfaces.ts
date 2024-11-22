export interface Doc {
    id: number;
    type: string;
    title: string;
    position: number;
}

export interface CardProps {
    document: Doc;
}