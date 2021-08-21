// Define the modal (for the image onclick) behaviour
import { LIS } from "../../../helpers/lis";

export const setupImageModal = () => {
  const modal = LIS.id("myModal");
  const img = LIS.id("imgg");
  if (img) {
    const modalImg = LIS.id("img01");
    const captionText = LIS.id("caption");
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    };
  }
};
