import { setupColorPicker } from "./color-picker/setup-color-picker";
import { loadIllustrations } from "./load-illustrations/load-illustrations";

setupColorPicker();
window["loadIllustrations"] = loadIllustrations;
