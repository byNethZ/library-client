export interface ICredentials{
    email: string;
    password: string;
}

export interface IRegister extends ICredentials{
    password_confirmation: string
}

export interface IAuthor{
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
    books?: IBook[]
}

export interface IBook{
    id: number,
    name: string,
    published_date: string,
    user_borrowed_id: null | number,
    created_at: string,
    updated_at: string,
    categories?: ICategory[],
    authors?: IAuthor[]
}
export interface ICategory{
    id: number,
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
    books: IBook[],
}
export interface IUser{
    id: number,
    role: number,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    created_at: string,
    updated_at: string,
    notifies?: IBook[]
}