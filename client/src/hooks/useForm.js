import { useState } from 'react';

/**
 * Hook מותאם אישית לניהול טפסים עם וולידציה ואינטגרציה עם Zustand store
 * 
 * @param {Object} initialValues - הערכים הראשוניים של הטופס
 * @param {Object} validationSchema - סכמת הוולידציה של Yup
 * @param {Object} options - אפשרויות נוספות
 * @param {Object} options.store - Store של Zustand עם isLoading, error, ו-success
 * @param {Function} options.onSubmitSuccess - פונקציה שתתבצע אחרי שליחה מוצלחת
 * @param {Function} options.onSubmitError - פונקציה שתתבצע במקרה של שגיאה
 * @returns {Object} אובייקט עם כל הפונקציות והנתונים הנדרשים לניהול הטופס
 */
const useForm = (initialValues, validationSchema, options = {}) => {
    const {
        store,
        onSubmitSuccess,
        onSubmitError
    } = options;
    // State לשמירת נתוני הטופס
    const [formData, setFormData] = useState(initialValues);
    
    // State לשמירת שגיאות וולידציה מקומיות (לא מהשרת)
    const [errors, setErrors] = useState({});
    
    // State פנימי לטעינה אם לא נתן store חיצוני
    const [internalLoading, setInternalLoading] = useState(false);

    // בחירה בין state פנימי לחיצוני מהחנות
    const isSubmitting = store?.isLoading ?? internalLoading;
    const serverError = store?.error;
    const isSuccess = store?.succeses; // שים לב לשגיאת הכתיב בחנות

    // ניקוי שגיאות שרת כשמתחילים להקליד
    const clearServerError = () => {
        if (store?.clearError) {
            store.clearError();
        }
    };

    /**
     * פונקציה לטיפול בשינוי ערכים בשדות הטופס
     * מעדכנת את הנתונים ומנקה שגיאות קיימות לשדה המתעדכן
     * 
     * @param {Event} e - אירוע השינוי מהשדה
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // עדכון הערך בנתוני הטופס
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // ניקוי שגיאה עבור השדה הנוכחי כשהמשתמש מתחיל להקליד
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
        
        // ניקוי שגיאות שרת כשמתחילים להקליד
        clearServerError();
    };

    /**
     * פונקציה פנימית לביצוע וולידציה על כל הטופס
     * משתמשת בסכמת Yup שהועברה כפרמטר
     * 
     * @returns {Object} אובייקט שגיאות - ריק אם אין שגיאות
     */
    const validateForm = async () => {
        try {
            // ביצוע וולידציה מלאה על כל השדות
            // abortEarly: false - מבטיח שנקבל את כל השגיאות ולא רק הראשונה
            await validationSchema.validate(formData, { abortEarly: false });
            return {}; // אין שגיאות - מחזיר אובייקט ריק
        } catch (validationError) {
            // המרת שגיאות Yup לפורמט מתאים למערכת
            const newErrors = {};
            validationError.inner?.forEach(error => {
                newErrors[error.path] = error.message;
            });
            return newErrors;
        }
    };

    /**
     * פונקציה ליצירת handler לשליחת טופס
     * מחזירה פונקציה אסינכרונית שמטפלת בכל תהליך השליחה
     * תומכת גם ב-store חיצוני (למשל Zustand) וגם ב-state פנימי
     * 
     * @param {Function} onSubmit - פונקציה שתתבצע אחרי וולידציה מוצלחת
     * @returns {Function} פונקציה לטיפול באירוע השליחה
     */
    const handleSubmit = (onSubmit) => {
        return async (e) => {
            e.preventDefault(); // מניעת שליחה רגילה של הטופס
            
            // עדכון loading - אם יש store חיצוני הוא יטפל, אחרת נשתמש ב-state פנימי
            if (!store) {
                setInternalLoading(true);
            }
            
            setErrors({}); // איפוס שגיאות וולידציה קודמות
            clearServerError(); // איפוס שגיאות שרת
            
            try {
                // ביצוע וולידציה מלאה
                const validationErrors = await validateForm();
                
                if (Object.keys(validationErrors).length === 0) {
                    // אם אין שגיאות וולידציה - הפעלת פונקציית השליחה
                    const result = await onSubmit(formData);
                    
                    // בדיקה אם יש שגיאה מהשרת (אם השתמשנו ב-store המנוהל)
                    if (result && result.success === false) {
                        if (onSubmitError) {
                            onSubmitError(result.error);
                        }
                    } else if (result && result.succeses !== false) {
                        // הצלחה
                        if (onSubmitSuccess) {
                            onSubmitSuccess(result);
                        }
                    }
                } else {
                    // אם יש שגיאות וולידציה - הצגתן למשתמש
                    setErrors(validationErrors);
                }
            } catch (error) {
                console.error('שגיאה בטיפול בטופס:', error);
                
                // הצגת שגיאה כללית למשתמש אם אין store חיצוני
                if (!store) {
                    const errorMessage = error.message || 'אירעה שגיאה לא צפויה';
                    setErrors({ submit: errorMessage });
                }
                
                if (onSubmitError) {
                    onSubmitError(error);
                }
            } finally {
                // איפוס loading - רק אם משתמשים ב-state פנימי
                if (!store) {
                    setInternalLoading(false);
                }
            }
        };
    };

    /**
     * פונקציה לאיפוס מלא של הטופס
     * מחזירה את כל הערכים למצב ההתחלתי
     */
    const resetForm = () => {
        setFormData(initialValues);
        setErrors({});
        if (!store) {
            setInternalLoading(false);
        }
        clearServerError();
    };

    /**
     * פונקציה לעדכון ערך ספציפי בטופס באופן פרוגרמטי
     * שימושית למקרים שבהם צריך לעדכן שדה מחוץ לאירוע onChange
     * 
     * @param {string} name - שם השדה
     * @param {any} value - הערך החדש
     */
    const setValue = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * פונקציה לקבלת ערך ספציפי מהטופס
     * 
     * @param {string} name - שם השדה
     * @returns {any} הערך של השדה
     */
    const getValue = (name) => {
        return formData[name];
    };

    /**
     * פונקציה לבדיקה האם יש שגיאות בטופס
     * 
     * @returns {boolean} true אם יש שגיאות, false אחרת
     */
    const hasErrors = () => {
        return Object.keys(errors).length > 0;
    };

    /**
     * החזרת כל הפונקציות והנתונים הנדרשים לשימוש בקומפוננט
     * 
     * @returns {Object} אובייקט עם:
     * - formData: נתוני הטופס הנוכחיים
     * - errors: שגיאות וולידציה
     * - isSubmitting: האם הטופס נשלח כרגע
     * - handleChange: פונקציה לטיפול בשינויים
     * - handleSubmit: פונקציה לטיפול בשליחה
     * - resetForm: פונקציה לאיפוס הטופס
     * - setValue: פונקציה לעדכון ערך ספציפי
     * - getValue: פונקציה לקבלת ערך ספציפי
     * - hasErrors: פונקציה לבדיקת קיום שגיאות
     * - setErrors: פונקציה לעדכון שגיאות (למקרים מתקדמים)
     */
    return {
        formData,
        errors,
        isSubmitting,
        serverError,
        isSuccess,
        handleChange,
        handleSubmit,
        resetForm,
        setValue,
        getValue,
        hasErrors,
        setErrors,
        clearServerError
    };
};

export default useForm;
