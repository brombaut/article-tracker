import Tag from "./tag";
import FirebaseDate from "./firebaseDate";

export default class Article {
  private _createdAt: FirebaseDate;

  private _lastClicked: FirebaseDate;

  private _title: string;

  private _minuteRead: number;

  private _tags: Tag[];

  private _url: string;

  private _read: boolean;

  constructor(ca: FirebaseDate, lc: FirebaseDate, t: string, mr: number, ts: Tag[], u: string, r: boolean) {
    this._createdAt = ca;
    this._lastClicked = lc;
    this._title = t;
    this._minuteRead = mr;
    this._tags = ts;
    this._url = u;
    this._read = r;
  }

  get createdAt(): number {
    return this._createdAt.seconds;
  }

  get lastClicked(): number {
    return this._lastClicked.seconds;
  }

  get title(): string {
    return this._title;
  }

  get url(): string {
    return this._url;
  }

  get read(): boolean {
    return this._read;
  }

  get minuteRead(): number {
    return this._minuteRead;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  compareTo(a: Article, field: string, type: string): number {
    switch (field) {
      case "created":
        return this.compareCreated(a, type);
      case "lastClicked":
        return this.compareLastClicked(a, type);
      case "title":
        return this.compareTitle(a, type);
      case "url":
        return this.compareUrl(a, type);
      default:
        throw new Error("Invalid Field");
    }
  }

  compareCreated(a: Article, type: string): number {
    if (type === "ascending") {
      return this.createdAt >= a.createdAt ? 1 : -1;
    }
    return this.createdAt < a.createdAt ? 1 : -1;
  }

  compareLastClicked(a: Article, type: string): number {
    if (type === "ascending") {
      return this.lastClicked >= a.lastClicked ? 1 : -1;
    }
    return this.lastClicked < a.lastClicked ? 1 : -1;
  }

  compareTitle(a: Article, type: string): number {
    if (type === "ascending") {
      return this.title >= a.title ? 1 : -1;
    }
    return this.title < a.title ? 1 : -1;
  }

  compareUrl(a: Article, type: string): number {
    if (type === "ascending") {
      return this.url >= a.url ? 1 : -1;
    }
    return this.url < a.url ? 1 : -1;
  }
}
