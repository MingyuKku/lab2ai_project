declare global {
    interface DateConstructor {
        parseUtcText: (text: string) => Date;
        toUtcText:  (text: string) => Date;
        parseText(text: string): Date;
    }

    interface Date {
        format(text: string): string;
    }

    interface String {
        zf(len: number): string;
    }

    interface Number {
        zf(len: number): string;
    }

    interface ObjectConstructor {
        getParams(obj:Record<string, any>): URLSearchParams;
    }
}

export {}
