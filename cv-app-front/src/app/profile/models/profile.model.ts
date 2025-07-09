export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  email?: string;
  phone?: string;
  skills?: string[];
  bio?: string;
  avatar?: string;
  cvUrl?: string;
}
