import css from './SearchBox.module.css';

interface SearchBoxProps {
    onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        onSearch(value);
    };

    return (
        <input
            type="text"
            className={css.input}
            placeholder='Search Notes'
            onChange={handleChange}
        />
    );
}