export default function Card({ title, description, children }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-64 h-64 flex flex-col justify-center items-center text-center border border-gray-200">
            {title && <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>}
            {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
            <div className="mt-auto">{children}</div>
        </div>
    );
}
