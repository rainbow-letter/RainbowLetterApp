declare module 'react-native-config' {
  export interface NativeConfig {
    HOSTNAME?: string;
    API_URL: string;
    API_HOST: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
