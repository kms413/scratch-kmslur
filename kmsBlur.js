/**
 * @file kmsBlur.js
 * @description Apply blur effect to the sprite.
 * 
 * @license
 * 本作品采用知识共享署名-相同方式共享 4.0 国际许可协议进行许可。
 * CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/
 * 
 * 您可以自由地：
 * - 共享：在任何媒介以任何形式复制、发行本作品
 * - 演绎：修改、转换或以本作品为基础进行创作
 * 
 * 惟须遵守下列条件：
 * - 署名：必须给出适当的署名，并提供指向本许可协议的链接
 * - 相同方式共享：如果您修改本作品，必须基于相同许可证分发您的贡献
 * 
 * @copyright none
 * @version 1.0.0
 *
 **/
(function(sc){
    const vm  = sc.vm,
    Cast = sc.Cast,
    runtime = vm.runtime,
    renderer = runtime.renderer
    const setup = {
        'zh-cn': {
            "Kong ming's Blur": "孔明の模糊",
            "Get blur": "获取模糊值",
            "Set blur to [blur]": "将模糊设置为 [blur]",
            "Change blur by [blur]": "将模糊增加 [blur]",
            "Restore original": "还原图像",
            "Manually clear memory": "手动释放内存（慎用）",
        },
        'zh-tw': {
            "Kong ming's Blur": "孔明の模糊",
            "Get blur": "獲取模糊值",
            "Set blur to [blur]": "將模糊設置為 [blur]",
            "Change blur by [blur]": "將模糊增加 [blur]",
            "Restore original": "還原圖像",
            "Manually clear memory": "手動釋放記憶體（慎用）",
        },
        'en': {
            "Kong ming's Blur": "Kong ming's Blur",
            "Get blur": "Get blur",
            "Set blur to [blur]": "Set blur to [blur]",
            "Change blur by [blur]": "Change blur by [blur]",
            "Restore original": "Restore original",
            "Manually clear memory": "Manually clear memory (DANGEROUS)",
        },
        'ja': {
            "Kong ming's Blur": "孔明の模糊",
            "Get blur": "ブラー値を取得",
            "Set blur to [blur]": "ブラーを [blur] に設定",
            "Change blur by [blur]": "ブラーを [blur] 増加",
            "Restore original": "元の画像に戻す",
            "Manually clear memory": "メモリを手動で解放（危険）",
        },
        'ko': {
            "Kong ming's Blur": "공명の블러",
            "Get blur": "블러 값 가져오기",
            "Set blur to [blur]": "블러를 [blur] 로 설정",
            "Change blur by [blur]": "블러를 [blur] 만큼 증가",
            "Restore original": "원본 이미지 복원",
            "Manually clear memory": "메모리 수동 해제 (위험)",
        },
        'fr': {
            "Kong ming's Blur": "Flou de Kong Ming",
            "Get blur": "Obtenir le flou",
            "Set blur to [blur]": "Définir le flou à [blur]",
            "Change blur by [blur]": "Modifier le flou de [blur]",
            "Restore original": "Restaurer l'original",
            "Manually clear memory": "Effacer la mémoire manuellement (DANGEREUX)",
        },
        'de': {
            "Kong ming's Blur": "Kong Ming's Unschärfe",
            "Get blur": "Unschärfe abrufen",
            "Set blur to [blur]": "Unschärfe auf [blur] setzen",
            "Change blur by [blur]": "Unschärfe um [blur] ändern",
            "Restore original": "Original wiederherstellen",
            "Manually clear memory": "Speicher manuell löschen (GEFÄHRLICH)",
        },
        'es': {
            "Kong ming's Blur": "Desenfoque de Kong Ming",
            "Get blur": "Obtener desenfoque",
            "Set blur to [blur]": "Establecer desenfoque a [blur]",
            "Change blur by [blur]": "Cambiar desenfoque por [blur]",
            "Restore original": "Restaurar original",
            "Manually clear memory": "Liberar memoria manualmente (PELIGROSO)",
        },
        'ru': {
            "Kong ming's Blur": "Размытие Конг Минга",
            "Get blur": "Получить размытие",
            "Set blur to [blur]": "Установить размытие в [blur]",
            "Change blur by [blur]": "Изменить размытие на [blur]",
            "Restore original": "Восстановить оригинал",
            "Manually clear memory": "Очистить память вручную (ОПАСНО)",
        },
        'pt': {
            "Kong ming's Blur": "Desfoque do Kong Ming",
            "Get blur": "Obter desfoque",
            "Set blur to [blur]": "Definir desfoque para [blur]",
            "Change blur by [blur]": "Alterar desfoque por [blur]",
            "Restore original": "Restaurar original",
            "Manually clear memory": "Limpar memória manualmente (PERIGOSO)",
        },
        'it': {
            "Kong ming's Blur": "Sfocatura di Kong Ming",
            "Get blur": "Ottieni sfocatura",
            "Set blur to [blur]": "Imposta sfocatura a [blur]",
            "Change blur by [blur]": "Cambia sfocatura di [blur]",
            "Restore original": "Ripristina originale",
            "Manually clear memory": "Cancella memoria manualmente (PERICOLOSO)",
        },
        'ar': {
            "Kong ming's Blur": "طمس كونغ مينغ",
            "Get blur": "الحصول على الطمس",
            "Set blur to [blur]": "ضبط الطمس إلى [blur]",
            "Change blur by [blur]": "تغيير الطمس بمقدار [blur]",
            "Restore original": "استعادة الصورة الأصلية",
            "Manually clear memory": "مسح الذاكرة يدوياً (خطير)",
        },
        'hi': {
            "Kong ming's Blur": "कोंग मिंग का ब्लर",
            "Get blur": "ब्लर प्राप्त करें",
            "Set blur to [blur]": "ब्लर को [blur] पर सेट करें",
            "Change blur by [blur]": "ब्लर को [blur] से बदलें",
            "Restore original": "मूल छवि पुनर्स्थापित करें",
            "Manually clear memory": "मैन्युअल रूप से मेमोरी साफ़ करें (खतरनाक)",
        },
        'th': {
            "Kong ming's Blur": "เบลอของขงเบ้ง",
            "Get blur": "รับค่าความเบลอ",
            "Set blur to [blur]": "ตั้งค่าความเบลอเป็น [blur]",
            "Change blur by [blur]": "เปลี่ยนความเบลอโดย [blur]",
            "Restore original": "คืนค่าภาพเดิม",
            "Manually clear memory": "ล้างหน่วยความจำด้วยตนเอง (อันตราย)",
        },
        'vi': {
            "Kong ming's Blur": "Làm mờ Khổng Minh",
            "Get blur": "Lấy giá trị làm mờ",
            "Set blur to [blur]": "Đặt độ mờ thành [blur]",
            "Change blur by [blur]": "Thay đổi độ mờ theo [blur]",
            "Restore original": "Khôi phục ảnh gốc",
            "Manually clear memory": "Xóa bộ nhớ thủ công (NGUY HIỂM)",
        }
    }

    function translate(x){
        return setup[sc.translate.language]?.[x] || setup.en[x]
    }
    function blurImage(uri, blur, width, height){
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"), svg.setAttribute("version", "1.1"), svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
        const u = Math.ceil(3 * blur),
            a = width + 2 * u,
            n = height + 2 * u
        svg.setAttribute("width", a), svg.setAttribute("height", n), svg.setAttribute("viewBox", `0 0 ${a} ${n}`)
        const o = document.createElementNS("http://www.w3.org/2000/svg", "image")
        o.setAttribute("href", uri), o.setAttribute("x", u), o.setAttribute("y", u), o.setAttribute("width", width), o.setAttribute("height", height), o.setAttribute("filter", "url(#blur)")
        const b = document.createElementNS("http://www.w3.org/2000/svg", "defs"),
            s = document.createElementNS("http://www.w3.org/2000/svg", "filter")
        s.id = "blur", s.setAttribute("x", "-100%"), s.setAttribute("y", "-100%"), s.setAttribute("width", "300%"), s.setAttribute("height", "300%")
        const g = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
        return g.setAttribute("stdDeviation", blur), s.appendChild(g), b.appendChild(s), svg.appendChild(b), svg.appendChild(o), {
            svg: svg,
            decode: (new XMLSerializer).serializeToString(svg),
            margin: u
        }
    }
    function parseColordata(data,width,height){
        try{
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            const imageData = new ImageData(data, width, height)
            ctx.putImageData(imageData, 0, 0)
            return canvas.toDataURL('image/png')
        }
        catch{
            return void 0
        }
    }
    function waitDone(skin,id){
        return new Promise(resolve=>{
            function e(e){
                e.target.removeEventListener('load',e)
                renderer._allDrawables[id].skin = renderer._allSkins[skin]
                runtime.requestRedraw()
                function r(){
                    runtime.removeListener("BEFORE_EXECUTE",r)
                    resolve()
                }
                runtime.on("BEFORE_EXECUTE",r)
            }
            renderer._allSkins[skin]._svgImage.addEventListener('load',e)
        })
    }
    function waitFPS(){
        return new Promise(resolve=>{
            function r(){
                    runtime.removeListener("BEFORE_EXECUTE",r)
                    resolve()
            }
            runtime.on("BEFORE_EXECUTE",r)
        })
    }
    class kmsBlur{
        clearMemory = this.clearCache
        constructor(){
            this.origin = {}
            this.blurred = {}
            runtime.on("PROJECT_STOP_ALL",()=>{
                this.clearCache()
            })
        }
        getInfo(){
            return sc.translate.language === "zh-tw" && console.log("台湾属于中国:臺灣屬於中國") ,{
                name:translate('Kong ming\'s Blur'),
                id:'kmsBlur',
                color1:'#668cff',
                color2:'#3d6dff',
                color3:'#7c9dff',
                blockIconURI:'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMjMuMDE4NTciIGhlaWdodD0iNzcuODM1NDEiIHZpZXdCb3g9IjAsMCwxMjMuMDE4NTcsNzcuODM1NDEiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODAuMjQ3NDcsLTEzNi41ODExNykiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjE1LjkyMTY0LDE1NS44MjE0OWwtMjguNDI0MTYsMTguNzg4MTUiIHN0cm9rZT0iIzhjOWJmZiIgc3Ryb2tlLXdpZHRoPSIxNC41Ii8+PHBhdGggZD0iTTIxMS4zNzUzNywxOTguOTE1NDlsLTIzLjg3Nzg5LC0yNC4zMDU4NCIgc3Ryb2tlPSIjOGM5YmZmIiBzdHJva2Utd2lkdGg9IjE0LjUiLz48cGF0aCBkPSJNMjExLjM3NTM3LDE5OC45MTU0OWwtMjMuODc3ODksLTI0LjMwNTg0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNC41Ii8+PHBhdGggZD0iTTIxNS45MjE2NCwxNTUuODIxNDlsLTI4LjQyNDE2LDE4Ljc4ODE1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNC41Ii8+PGc+PHBhdGggZD0iTTI1NC40NjkyMSwxNDMuODMxMTdsLTI1LjE0NjMxLDYzLjMzNTQxIiBzdHJva2U9IiM4YzliZmYiIHN0cm9rZS13aWR0aD0iMTQuNSIvPjxwYXRoIGQ9Ik0yNTQuNDY5MjEsMTQzLjgzMTE3bC0yNS4xNDYzMSw2My4zMzU0MSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48cGF0aCBkPSJNMjY5LjUzMDM2LDE1Ny4yMDg5OWwyNi40ODU2OCwyMS40MzQ0NiIgc3Ryb2tlPSIjOGM5YmZmIiBzdHJva2Utd2lkdGg9IjE0LjUiLz48cGF0aCBkPSJNMjY5LjkxMTQ3LDIwMC41NDA0NWwyNi4xMDQ1OCwtMjEuODk3IiBzdHJva2U9IiM4YzliZmYiIHN0cm9rZS13aWR0aD0iMTQuNSIvPjxwYXRoIGQ9Ik0yNjkuOTExNDcsMjAwLjU0MDQ1bDI2LjEwNDU4LC0yMS44OTciIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0LjUiLz48cGF0aCBkPSJNMjY5LjUzMDM2LDE1Ny4yMDg5OWwyNi40ODU2OCwyMS40MzQ0NiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjU5Ljc1MjUyNDk5OTk5OTk5OjQzLjQxODgzMDAwMDAwMDAxNC0tPg==',
                blocks:[
                    {
                        opcode:'getBlur',
                        blockType:'reporter',
                        text:translate('Get blur'),
                    },
                    {
                        opcode:'setBlur',
                        blockType:'command',
                        text:translate('Set blur to [blur]'),
                        arguments:{
                            blur:{
                                type:"number",
                                defaultValue:10
                            }
                        }
                    },
                    {
                        opcode:'changeBlur',
                        blockType:'command',
                        text:translate('Change blur by [blur]'),
                        arguments:{
                            blur:{
                                type:"number",
                                defaultValue:10
                            }
                        }
                    },
                    {
                        opcode:'restoreOriginal',
                        blockType:'command',
                        text:translate('Restore original')
                    },
                    {
                        opcode:'clearMemory',
                        blockType:'command',
                        text:translate('Manually clear memory')
                    }
                ]
            }
        }
        clearCache() {
            for (const drawableID in this.origin) {
                const originSkins = this.origin[drawableID]
                for (const originalSkinID in originSkins) {
                    const blurredSkinID = originSkins[originalSkinID].id
                    for (const drawable of renderer._allDrawables) {
                        drawable.skin.id === blurredSkinID && (drawable.skin=renderer._allSkins[originalSkinID])
                    }
                    if (renderer._allSkins[blurredSkinID]) {
                        renderer.destroySkin(blurredSkinID)
                    }
                }
            }
            for (const drawableID in this.blurred) {
                const blurredSkins = this.blurred[drawableID]
                for (const blurredSkinID in blurredSkins) {
                    const originalSkinID = blurredSkins[blurredSkinID].id
                    if (renderer._allSkins[blurredSkinID]) {
                        renderer.destroySkin(blurredSkinID)
                    }
                }
            }

            this.origin = {}
            this.blurred = {}
        }


        getBlur(args,util){
            const target = util.target
            ,id = target.drawableID
            ,skin = renderer._allDrawables[id].skin.id 
            return this.blurred?.[id]?.[skin]?.blur || 0
        }
        async setBlur(args,util){
            if(isNaN(args.blur) || args.blur <= 0) return this.restoreOriginal(args,util)
            const target = util.target
            ,id = target.drawableID
            
            this.origin[id] ??= {}
            this.blurred[id] ??= {}


            let oskin = renderer._allDrawables[id].skin
            ,skinId = oskin.id
            ,nskinId = skinId

            if(this.origin[id][skinId]){
                nskinId = this.origin[id][skinId].id
            }else if(this.blurred[id][skinId]){
                nskinId = this.blurred[id][skinId].id
            }
            oskin = renderer._allSkins[nskinId]

            const img = oskin._svgImage
            ,s = oskin._silhouette
            ,uri = img?.src || s?._lazyData?.toDataURL() || parseColordata(s._colorData,s._width,s._height)
            ,size = oskin.size
            ,blurred = blurImage(uri,args.blur,size[0],size[1])
            ,rotationCenter = oskin.rotationCenter.map(x=>x+blurred.margin)
            
            let skin
            if(this.origin[id][skinId]){
                skin = this.origin[id][skinId].id
                renderer.updateSVGSkin(skin,blurred.decode,rotationCenter)
                this.blurred[this.origin[id][skinId].id].blur = args.blur
                console.log("Updated")
            }else if(this.blurred[id][skinId]){
                skin = skinId
                renderer.updateSVGSkin(skinId,blurred.decode,rotationCenter)
                this.blurred[id][skinId].blur = args.blur
                console.log("Updated")
            }else{
                skin = renderer.createSVGSkin(blurred.decode,rotationCenter)
                this.origin[id][skinId] = {id:skin}
                this.blurred[id][skin] = {id:skinId,blur:args.blur}
                console.log("Craeted")
            }

            return waitDone(skin,id)
        }
        async changeBlur(args,util){
            let blur = +(this.getBlur(args,util)) + +(args.blur)
            if(isNaN(blur)) return Promise.resolve()
            return this.setBlur({blur:blur},util)
        }
        async restoreOriginal(args,util){
            const target = util.target
            ,id = target.drawableID
            ,skin = renderer._allDrawables[id].skin.id
            if(this.blurred[id][skin]){
                renderer._allDrawables[id].skin = renderer._allSkins[this.blurred[id][skin].id]
                this.blurred[id][skin].blur = 0
                runtime.requestRedraw()
            }
            return Promise.resolve()
        }
    }
    sc.extensions.register(new kmsBlur())
})(Scratch)
