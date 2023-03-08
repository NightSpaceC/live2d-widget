import showMessage from "./message.js";
import { getLength, selection } from "./utils.js";

class Model {
    constructor(modelPath) {
        this.modelPath = modelPath;
    }

    async loadModelList() {
        const response = await fetch(`${this.modelPath}model_list.json`);
        this.modelList = await response.json();
    }

    async loadModel(modelId, modelTexturesId, message) {
        localStorage.setItem("modelId", modelId);
        localStorage.setItem("modelTexturesId", modelTexturesId);
        showMessage(message, 4000, 10);
        if (!this.modelList) await this.loadModelList();
		const target = selection(this.modelList.models[modelId - 1], modelTexturesId - 1);
		loadlive2d("live2d", `${this.modelPath}model/${target}`);
    }

    async loadRandModel() {
    	const modelId = Number(localStorage.getItem("modelId")),
			modelTexturesId = Number(localStorage.getItem("modelTexturesId"));
        if (!this.modelList) await this.loadModelList();
		if (getLength(this.modelList.models[modelId - 1]) <= 1) showMessage("我还没有其他衣服呢！", 4000, 10);
		else {
			const index = (modelTexturesId + 1 > getLength(this.modelList.models[modelId - 1])) ? 1 : modelTexturesId + 1;
			// const index = Math.floor(Math.random() * getLength(this.modelList.models[modelId - 1])) + 1;
			this.loadModel(modelId, index, "我的新衣服好看嘛？");
		}
    }

    async loadOtherModel() {
        const modelId = Number(localStorage.getItem("modelId"));
        if (!this.modelList) await this.loadModelList();
		const index = (modelId + 1 > getLength(this.modelList.models)) ? 1 : modelId + 1;
		// const index = Math.floor(Math.random() * getLength(this.modelList.models)) + 1;
		this.loadModel(index, 1, this.modelList.messages[index - 1]);
    }
}

export default Model;
