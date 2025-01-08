export interface PartType {
    title: string;
    price: number;
    description: string;
    category: string;
    subcategory: string;
}

export interface PartTypeID extends PartType {
    _id: string;
}

export interface IAuthConext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export type IResponseType = PartTypeID;

export interface ModalProps {
    visible: boolean;
    hideModal: () => void;
  }
