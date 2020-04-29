import { CategoryRepository } from "../../repositories/CategoryRepository";
import { Category } from "../../models/entities/Category";
import { createConnection } from "typeorm";

async function generateCategories () {
    const categories:string[] = ['Jucării de societate','Jucării băieți','Jucării fetițe'];

    const categoryRepository = new CategoryRepository();

    categories.forEach(async (category:string) => {
        const newCategory:Category = new Category();
        newCategory.name = category;

        await categoryRepository.create(newCategory);
    })

    const subCategories1:string[] = ['Pentru familie','Jocuri de logică'];
    subCategories1.forEach(async (subcategory:string) => {
        const newCategory:Category = new Category();
        newCategory.name = subcategory;
        newCategory.parentName = categories[0];

        await categoryRepository.create(newCategory);
    })

    const subCategories2:string[] = ['Cars','Jucării Sam Pompierul'];
    subCategories2.forEach(async (subcategory:string) => {
        const newCategory:Category = new Category();
        newCategory.name = subcategory;
        newCategory.parentName = categories[1];

        await categoryRepository.create(newCategory);
    })

    const subCategories3:string[] = ['Păpuși Barbie','My Little Pony'];
    subCategories3.forEach(async (subcategory:string) => {
        const newCategory:Category = new Category();
        newCategory.name = subcategory;
        newCategory.parentName = categories[2];

        await categoryRepository.create(newCategory);
    })

}


createConnection().then(async () => {
    await generateCategories();

}).catch(error => {
    console.log(error);
})