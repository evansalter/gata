import moment from 'moment';

export enum FieldType {
    String = 0,
    Dropdown = 1,
}

export class DropdownValue {
    value: string;
    isDefault: boolean;

    constructor(); 
    constructor(value: string); 
    constructor(value?: string) {
        this.value = value;
        this.isDefault = false;
    }
}

export class Field {
    name: string;
    type: FieldType;
    dropdownValues?: DropdownValue[];

    public static fromObject(obj: Object) {
        const f = new Field();
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                f[key] = obj[key]
            }
        }
        f.type = f.type || FieldType.String;
        return f;
    }

    public validate() {
        if (!this.name) {
            throw new Error('Field name is required');
        }
    }
}

export class Command {
    id: string;
    name: string;
    description?: string;
    url: string;
    fields: Field[];

    created: string;

    constructor();
    constructor(url: string, fields: Field[], name?: string, description?: string);
    constructor(url?: string, fields?: Field[], name?: string, description?: string) {
        this.name = name;
        this.url = url;
        this.fields = fields;
        this.description = description;

        const now = moment();
        this.id = now.utc().unix().toString();
        this.created = now.toISOString();
    }

    public static fromObject(obj: Object) {
        const c = new Command();
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                c[key] = obj[key]
            }
        }
        c.fields.forEach((f, idx) => c.fields[idx] = Field.fromObject(f));
        return c;
    }

    private validate() {
        if (!this.url) {
            throw new Error('URL is required');
        }
        if (!this.id) {
            throw new Error('Internal Error: ID is required');
        }
        for (let field of this.fields) {
            field.validate();
        }
    }

    public save(): void {
        this.validate()
        chrome.storage.sync.set({
            [this.id]: this
        }, console.log);
    }

    public delete(): void {
        chrome.storage.sync.remove(this.id, console.log);
    }

    public static list(): Promise<Command[]> {
        return new Promise<Command[]>((resolve, reject) => {
            chrome.storage.sync.get(results => {
                resolve(Object.entries(results).map((v: [string, Command]) => Command.fromObject(v[1])))
            })
        });
    }
}