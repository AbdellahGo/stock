import z from "zod"

const productSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    quantity: z.coerce.number().int().min(0, "Quantity cannot be negative"),
    category_id: z.coerce.number().min(1, "Please select a category"),
    supplier_id: z.coerce.number().min(1, "Please select a supplier"),
    description: z.string().optional().default(""),
    image_url: z.string().url().optional().or(z.literal("")),
});

const productDataValidator = (req, res, next) => {
    const result = productSchema.safeParse(req.body)

    if (!result.success) {
        const issues = result.error.issues;
        const errorMessage = issues.length > 0
            ? issues[0].message
            : "Invalid data provided";
        return res.status(400).json({
            message: errorMessage,
            details: issues
        })
    }

    req.body = result.data;
    next();
}

export default productDataValidator;