import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterList'})
export class FilterListPipe implements PipeTransform {

    transform(value: any, searchValueText: string, filterField: any) {
        // console.log(filterField);
        if (searchValueText) {
            if (filterField) {
                if (Array.isArray(filterField)) {
                    let filterData: Array<any> = [];
                    let propertyName;
                    for (let i = 0; i < filterField.length; i++) {

                        if (typeof filterField[i] == "object") {
                            propertyName = filterField[i].property;
                        } else {
                            propertyName = filterField[i];
                        }

                        for (let v in value) {

                            if (value[v][propertyName]) {

                                if (!isNaN(value[v][propertyName])) {
                                    value[v][propertyName] = value[v][propertyName].toString();
                                }
                                let data = value[v][propertyName].toLowerCase().indexOf(searchValueText) > -1 || value[v][propertyName].indexOf(searchValueText) > -1;

                                if (data && !this.isExists(filterData, value[v])) {
                                    filterData.push(value[v]);
                                }
                            }
                        }
                    }
                    return filterData;

                } else if (typeof filterField == "string") {
                    return this.filter(value, searchValueText, filterField);
                }
            } else {
                return this.filter(value, searchValueText, "name");
            }
        }
        return value;
    }

    /**
     * Check if array contains sub array
     *
     * @param source array
     * @param target array
     * @returns {boolean}
     */
    private isExists(source, target) {
        let status = false;

        if (source.length > 0) {
            for (let i = 0; i < source.length; i++) {
                status = false;

                for (let v in target) {

                    if (target[v] != source[i][v]) {
                        status = false;
                        break;
                    }

                    status = true;
                }
                if (status)
                    break;
            }
        }
        return status;
    }

    /**
     * Filter a data from
     *
     * @param value
     * @param input
     * @param filterField
     * @returns {any}
     */
    private filter(value, searchValueText, filterField) {
        searchValueText = searchValueText.toLocaleLowerCase();

        return value.filter(function (ele: any) {
            let name: string = ele[filterField];
            if (name)
                return name.toLowerCase().indexOf(searchValueText) > -1 || name.indexOf(searchValueText) > -1;

            return "";

        });
    }
}




