export interface RegisterPayload {
  email: string;
  password: string;
  role: string;
  profileType: 'INTERVENANT' | 'ECOLE';
}

export interface CompleteProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
}
