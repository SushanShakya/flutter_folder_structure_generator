import { extractListType } from "../../utils/type_utils";

export function generateDataClass(type: string): string {
    let className = type;
    if (className.startsWith("List")) {
        className = extractListType(type);
    }
    return `class ${className} {
        ${className}();

        factory ${className}.fromMap(Map<String, dynamic> map){
            return ${className}();
        }
        
        Map<String, dynamic> toMap() {
            return {};
        }
    }`;
}