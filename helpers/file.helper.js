const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const uuid = require('uuid').v1();

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
    _photoDirBuilder: async (fileName, itemId, itemType) => {
        const pathWithoutStatic = path.join(itemType, itemId.toString(), 'photos');
        const photoDirectory = path.join(process.cwd(), 'static', pathWithoutStatic);

        const fileExtension = fileName.split('.').pop();
        const photoName = `${uuid()}.${fileExtension}`;
        const finalPath = path.join(photoDirectory, photoName);

        await mkdirPromise(photoDirectory, { recursive: true });

        return {
            finalPath,
            photoPath: path.join(pathWithoutStatic, photoName)
        };
    }

};
