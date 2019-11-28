export class Image {

    _id: string;
    title: String;
    description: String;
    filename:  String;
    path: String;
    originalname:  String;
    mimetype:  String;
    size:  Number;
    created_at:  string;

    constructor(_id = '', title = '', description = '', filename = '', path = '', originalname = '', mimetype = '', size = 0, created_at = '' ) {
            this.created_at = created_at;    
            this._id = _id;
            this.title = title;
            this.description = description;
            this.filename = filename;
            this.path = path;
            this.originalname = originalname;
            this.mimetype = mimetype;
            this.size = size;
            
        }
}
