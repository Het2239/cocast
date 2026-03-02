import { useEffect } from 'react';

/**
 * Sets document.title and meta description for each page.
 * Resets to site defaults on unmount.
 */
const useSEO = ({
    title,
    description,
}: {
    title: string;
    description?: string;
}) => {
    useEffect(() => {
        const siteName = 'Cocast India';
        document.title = title ? `${title} | ${siteName}` : siteName;

        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                (metaDesc as HTMLMetaElement).name = 'description';
                document.head.appendChild(metaDesc);
            }
            (metaDesc as HTMLMetaElement).content = description;
        }

        return () => {
            document.title = 'Cocast – Natural & Homemade Personal Care Products | India';
        };
    }, [title, description]);
};

export default useSEO;
