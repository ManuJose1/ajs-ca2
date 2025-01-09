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

export interface LoginModalProps {
    visible: boolean;
    hideModal: () => void;
    showRegisterModal: () => void;
  }

export interface RegisterModalProps {
    visible: boolean;
    hideModal: () => void;
    showLoginModal: () => void;
  }

export interface EditPartModalProps {
    visible: boolean;
    hideModal: () => void;
    updatePartDetails: (updatedPart: PartTypeID) => void;
  }
