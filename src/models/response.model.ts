export default interface ApiResponse {
  success: boolean;
  status_code: number;
  status_title: string;
  message: any | null;
  data: any | null;
  errors: any | null;
}
