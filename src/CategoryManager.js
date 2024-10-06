class CategoryManager {
    constructor() {
        this.categories = ['color', 'shape', 'number'];
        this.currentCategory = 'color';
        this.categoryCount = 0;
        this.maxCategories = 6;
        this.currentSuccessInCategory = 0;
        this.maxSuccessInCategory = 10;
        this.switchCategory(); // Initialize with a random category
    }

    switchCategory() {
        // Use 'this' to access properties and methods in the class
        this.currentCategory = this.categories[this.categoryCount % this.categories.length];
        this.categoryCount++;
    }

    setBySuccess() {
        if (this.currentSuccessInCategory < this.maxSuccessInCategory) {
            this.currentSuccessInCategory++;
        } else {
            this.currentSuccessInCategory = 0;
            this.switchCategory();
        }
    }

    setByMistake() {
        this.currentSuccessInCategory = 0;
    }

    // Getters
    getMaxSuccessInCategory() {
        return this.maxSuccessInCategory;
    }

    getCurrentSuccessInCategory() {
        return this.currentSuccessInCategory;
    }

    getCurrentCategory() {
        return this.currentCategory;
    }

    getCategoryCount() {
        return this.categoryCount;
    }

    getMaxCategories() {
        return this.maxCategories;
    }
}

export default CategoryManager;
