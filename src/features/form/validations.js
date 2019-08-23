import { format } from "date-fns";
import LocalizedMessage from "../../components/localization/LocalizedMessage";

const minValue = min => value => 
  value && value < min ? ( <span><LocalizedMessage
    id="reactcomponents.value.mustBeAtLeast"
    defaultMessage="Must be at least" />&nbsp;{min}</span> ) : undefined;

const maxValue = max => value =>
  value && value > max ? ( <span><LocalizedMessage
    id="reactcomponents.value.mustBeLessThan"
    defaultMessage="Must be less than" />&nbsp;{max + 1}</span> ) : undefined ;

const abnormalMaxValue = max => value =>
  value && value > max ? <LocalizedMessage
    id="reactcomponents.value.abnormal"
    defaultMessage="Abnormal value" /> : undefined ;

const abnormalMinValue = min => value => (value && value < min ? <LocalizedMessage
    id="reactcomponents.value.abnormal"
    defaultMessage="Abnormal value" /> : undefined);

const criticalMaxValue = max => value =>
  value && value > max ? <LocalizedMessage
    id="reactcomponents.value.critical"
    defaultMessage="Critical value" /> : undefined ;

const criticalMinValue = min => value => (value && value < min ? (<LocalizedMessage
  id="reactcomponents.value.critical"
  defaultMessage="Critical value" />) : undefined);

const isRequired = value => value ? undefined : <LocalizedMessage
  id="reactcomponents.value.required"
  defaultMessage="Required" />;

const dateToInt = dateStr => new Date(dateStr).getTime();

const maxDateValue = (maxDate, reference, customText) => value => {
  if (!value || typeof dateToInt(value) !== 'number') {
    return undefined;
  }
  if (value && (dateToInt(format(value, "YYYY-MM-DD"))) > (dateToInt(format(maxDate, "YYYY-MM-DD")))) {
    return reference ? `Date should be earlier or equal to ${reference} date` : customText;
  } else {
    return undefined;
  }
};

const minDateValue = (minDate, reference, customText) => value => {
  if (!value || typeof dateToInt(value) !== 'number') {
    return undefined;
  }
  if (value && (dateToInt(format(value, "YYYY-MM-DD")) < dateToInt(format(minDate, "YYYY-MM-DD")))) {
    return reference ? `Date should be later or equal to ${reference} date` : customText;
  } else {
    return undefined;
  }
};

const generateAbsoluteRangeValidators = concept => {
  const {
    hiAbsolute,	
    lowAbsolute,
  } = concept;
  let hiAbsoluteRange, lowAbsoluteRange;

  if (hiAbsolute || lowAbsolute) {
    hiAbsoluteRange = hiAbsolute ? maxValue(hiAbsolute) : undefined;
    lowAbsoluteRange = hiAbsolute ? minValue(lowAbsolute) : undefined;
    return [hiAbsoluteRange, lowAbsoluteRange].filter(Boolean);
  } else {
    return [];
  }
};

const generateAbnormalAndCriticalWarningFunctions = concept => {
  const {
    hiNormal,	
    hiCritical,
    lowCritical,	
    lowNormal,
  } = concept;
  let hiNormalRange, lowNormalRange, hiCriticalRange, lowCriticalRange;
  
  if (hiNormal || hiCritical || lowCritical || lowNormal) {
    hiNormalRange = hiNormal ? abnormalMaxValue(hiNormal) : undefined;
    lowNormalRange = lowNormal ? abnormalMinValue(lowNormal) : undefined;
    hiCriticalRange = hiCritical ? criticalMaxValue(hiCritical) : undefined;
    lowCriticalRange = lowCritical ? criticalMinValue(lowCritical) : undefined;
    return [hiCriticalRange, hiNormalRange, lowCriticalRange, lowNormalRange].filter(Boolean);
  } else {
    return [];
  }
};

export default {
  minValue,
  maxValue,
  abnormalMaxValue,
  abnormalMinValue,
  criticalMinValue,
  criticalMaxValue,
  maxDateValue,
  minDateValue,
  generateAbsoluteRangeValidators,
  generateAbnormalAndCriticalWarningFunctions,
  isRequired
};
