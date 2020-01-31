export enum FieldType {
    String = 0,
}

export class Field {
    name: string;
    type: FieldType;
}

export class Command {
    name: string;
    description?: string;
    url: string;
    fields: Field[];

    constructor(name: string, url: string, fields: Field[], description?: string) {
        this.name = name;
        this.url = url;
        this.fields = fields;
        this.description = description;
    }

    save(): void {
        console.log(`setting ${JSON.stringify({[this.name]: this})}`);
        debugger;
        chrome.storage.sync.set({
            [this.name]: this
        }, console.log);
    }

    public static list(): Promise<Command[]> {
        return new Promise<Command[]>((resolve, reject) => {
            chrome.storage.sync.get(results => {
                resolve(Object.entries(results).map((v: [string, Command]) => v[1]))
            })
        });
    }
}