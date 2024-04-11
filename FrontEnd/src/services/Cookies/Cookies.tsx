
export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

export function deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }