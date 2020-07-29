import FirebaseDate from "../types/firebaseDate";
import Tag from "../types/tag";

export default interface ArticleDTO {
  createdAt: FirebaseDate;
  lastClicked: FirebaseDate;
  title: string;
  minuteRead: number;
  tags: Tag[];
  url: string;
  read: boolean;
}
