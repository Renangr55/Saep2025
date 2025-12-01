import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import api from "../services/api";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [quantity, setQuantity] = useState("");
    const [minimum_quantity, setMinimumQuantity] = useState("");
    const [categoryProduct, setCategory] = useState("");
    const [imageProduct, setImageProduct] = useState(null);

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [errors, setErrors] = useState({}); // ← NOVO

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("api/createListCategory");
                setCategories(response.data);
            } catch (error) {
                alert("Error loading categories");
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const validateFields = () => {
        let newErrors = {};

        if (!name.trim()) newErrors.name = "Product name is required";
        if (!weight) newErrors.weight = "Weight is required";
        if (!height) newErrors.height = "Height is required";
        if (!quantity) newErrors.quantity = "Quantity is required";
        if (!minimum_quantity) newErrors.minimum_quantity = "Minimum quantity is required";
        if (!categoryProduct) newErrors.categoryProduct = "Category is required";

        if (quantity && minimum_quantity && Number(quantity) < Number(minimum_quantity)) {
            newErrors.quantityCheck = "Quantity cannot be smaller than minimum";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("weight", Number(weight));
        formData.append("height", Number(height));
        formData.append("quantity", Number(quantity));
        formData.append("minimum_quantity", Number(minimum_quantity));
        formData.append("categoryProduct", Number(categoryProduct));

        if (imageProduct) {
            formData.append("imageProduct", imageProduct);
        }

        try {
            await api.post("api/createListProduct", formData);
            alert("Product created successfully!");
            navigate("/homepage");
        } catch (error) {
            alert(error.response?.data || "Error creating product");
        }
    };

    return (
        <>
            <Header />
            <main className="h-screen">
                <section className="pl-5 pt-10">
                    <h1 className="font-bold text-5xl">Create a Tool</h1>
                </section>

                <form onSubmit={handleSend} className="flex flex-col gap-5">

                    {/* Product name */}
                    <section className="flex flex-col pl-5 pt-5">
                        <label>Product name:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </section>

                    {/* Weight */}
                    <section className="flex flex-col pl-5">
                        <label>Product weight:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        {errors.weight && <p className="text-red-500">{errors.weight}</p>}
                    </section>

                    {/* Height */}
                    <section className="flex flex-col pl-5">
                        <label>Height:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        {errors.height && <p className="text-red-500">{errors.height}</p>}
                    </section>

                    {/* Quantity */}
                    <section className="flex flex-col pl-5">
                        <label>Quantity:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                        {errors.quantityCheck && <p className="text-red-500">{errors.quantityCheck}</p>}
                    </section>

                    {/* Minimum Quantity */}
                    <section className="flex flex-col pl-5">
                        <label>Minimum quantity:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="number"
                            value={minimum_quantity}
                            onChange={(e) => setMinimumQuantity(e.target.value)}
                        />
                        {errors.minimum_quantity && <p className="text-red-500">{errors.minimum_quantity}</p>}
                    </section>

                    {/* Category */}
                    <section className="flex flex-col pl-5">
                        <label>Category:</label>
                        {loadingCategories ? (
                            <p>Loading categories...</p>
                        ) : (
                            <select
                                className="h-12 w-80 pl-5 bg-gray-300"
                                value={categoryProduct}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors.categoryProduct && <p className="text-red-500">{errors.categoryProduct}</p>}
                    </section>

                    {/* Image upload */}
                    <section className="flex flex-col pl-5">
                        <label>Upload of Images:</label>
                        <input
                            className="h-12 w-80 pl-5 bg-gray-300"
                            type="file"
                            onChange={(e) => setImageProduct(e.target.files[0])}
                        />
                    </section>

                    {/* Submit button */}
                    <section className="flex justify-start pl-5 w-full pb-2">
                        <Button
                            typeButton="submit"
                            children={"Create "}
                            bgButton={"bg-linear-to-r from-blue-500 to-purple-500"}
                            heightButton={"h-10"}
                            widhtButton={"w-80"}
                            textColor={"text-white"}
                        />
                    </section>
                </form>
            </main>
        </>
    );
};

export default CreateProduct;
