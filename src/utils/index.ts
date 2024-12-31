import { toast, ToastOptions } from 'react-toastify';

// interface JSONAPIError {
//   status: string;
//   title: string;
//   detail?: string;
//   source?: {
//     pointer?: string;
//     parameter?: string;
//   };
// }

// interface JSONAPIErrorResponse {
//   errors: JSONAPIError[];
// }

interface HostnameValidationRules {
  validChars: RegExp;
  noConsecutiveSpecials: RegExp;
  validStart: RegExp;
  validEnd: RegExp;
  minLength: number;
  maxLength: number;
}


export const isValidUrl = (urlString: string): boolean => {
  if (!urlString || typeof urlString !== 'string') {
    return false;
  }

  try {
    const normalizedUrl = normalizeUrl(urlString);
    const url = new URL(normalizedUrl);
    return (
      isValidProtocol(url.protocol) &&
      isValidHostname(url.hostname, hostnameRules) &&
      isValidLabels(url.hostname) &&
      isValidTld(url.hostname) &&
      isValidPort(url.port) &&
      isValidPath(url.pathname) &&
      isValidQuery(url.search)
    );

  } catch {
    return false;
  }
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const hostnameRules: HostnameValidationRules = {
  validChars: /^[a-zA-Z0-9-._]+$/,
  noConsecutiveSpecials: /^(?!.*[._-]{2})[a-zA-Z0-9-._]+$/,
  validStart: /^[a-zA-Z0-9]/,
  validEnd: /[a-zA-Z0-9]$/,
  minLength: 1,
  maxLength: 253
};

const normalizeUrl = (urlString: string): string => {
  let normalized = urlString.trim();
  
  if (normalized.startsWith('www.')) {
    normalized = `http://${normalized}`;
  }
  
  if (!/^(?:https?:)?\/\//i.test(normalized)) {
    normalized = `http://${normalized}`;
  }
  
  try {
    const url = new URL(normalized);
    normalized = url.toString(); 
  } catch {
    return urlString
  }
  
  return normalized;
};

const isValidProtocol = (protocol: string): boolean => {
  return ['http:', 'https:'].includes(protocol);
};

const isValidHostname = (hostname: string, rules: HostnameValidationRules): boolean => {
  if (hostname.startsWith('www.')) {
    hostname = hostname.slice(4);
  }

  if (!hostname ||
      hostname.length < rules.minLength ||
      hostname.length > rules.maxLength ||
      !rules.validChars.test(hostname) ||
      !rules.noConsecutiveSpecials.test(hostname) ||
      !rules.validStart.test(hostname) ||
      !rules.validEnd.test(hostname) ||
      !hostname.includes('.')) {
    return false;
  }

  return true;
};

const isValidLabels = (hostname: string): boolean => {
  const labels = hostname.split('.');
  const validLabel = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  
  return labels.every(label => 
    label.length <= 63 && validLabel.test(label)
  );
};

const isValidTld = (hostname: string): boolean => {
  const tld = hostname.split('.').pop() || '';
  return /^[a-zA-Z]{2,}$/.test(tld);
};

const isValidPort = (port: string): boolean => {
  if (!port) return true;
  const portNum = parseInt(port, 10);
  return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
};

const isValidPath = (pathname: string): boolean => {
  if (pathname === '/') return true;
  const validPath = /^[a-zA-Z0-9-._~!$&'()*+,;=:@/%]*$/;
  return validPath.test(pathname);
};

const isValidQuery = (search: string): boolean => {
  if (!search || search === '?') return true;
  const validQuery = /^[a-zA-Z0-9-._~!$&'()*+,;=:@/?%]*$/;
  return validQuery.test(search.slice(1));
};

export const getToken = (): string | null => {
  const userData = localStorage.getItem('user');
  if (userData) {
      try {
          const user = JSON.parse(userData);
          return user.token || null;
      } catch (error) {
          console.error('Failed to parse user data from localStorage:', error);
          return null;
      }
  }
  return null;
};

export const handleAPIError = (error: unknown): void => {
  if (error instanceof Error) {
    showErrorToast(error.message); 
  } else {
    showErrorToast("An unknown error occurred.");
  }
};


const defaultToastConfig: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showSuccessToast = (message: string) => {
  toast.success(message, defaultToastConfig);
};

export const showErrorToast = (message: string) => {
  toast.error(message, defaultToastConfig);
};

export const showInfoToast = (message: string) => {
  toast.info(message, defaultToastConfig);
};

export const showWarningToast = (message: string) => {
  toast.warn(message, defaultToastConfig);
};
