export const getResourceId = (path: string, resourceName: string) =>
    +path.replace(`http://gateway.marvel.com/v1/public/${resourceName}/`, "");
