export const CHANGE_OG_HEADER = 'CHANGE_OG_HEADER';

export interface ChangeOgHeader {
    type: typeof CHANGE_OG_HEADER,
    title: string,
    description: string,
    image: string,
    url: string
}

export interface OgHeader {
    title: string,
    description: string,
    image: string,
    url: string
}

/**
 * Change current theme path
 */
export function changeOgHeader(title: string, description: string, image: string, url: string): ChangeOgHeader {
    return { type: CHANGE_OG_HEADER, title, description, image, url };
}
