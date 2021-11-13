
import { Readable } from 'svelte/store';

interface Settings {
  defaultRule?: Rule;
  fields: Record<string, Field>;
}

interface Field {
  rule?: Rule;
  value: () => any;
}

interface Rule {
  validate: (input?: any) => string | boolean;
  value?: (fieldValue?: any) => any;
  error?: string;
}

interface Checker extends Readable<Store> {
  validate: () => boolean;
}

interface Store {
  fields: Record<string, FieldStore>;
  valid: boolean;
}

type FieldStore = {
  error: string;
  valid: boolean;
};

declare function createChecker(settings: Settings): Checker;