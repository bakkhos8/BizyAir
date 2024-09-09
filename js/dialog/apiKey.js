import { dialog } from '../subassembly/dialog.js';
import { $el } from "../../../scripts/ui.js";
export function apiKey() {
    async function toSubmit() {
        const apiKey = document.querySelector('#bizyair-api-key');
        console.log(apiKey.value)
        if (!apiKey.value) {
            // new ConfirmDialog({
            //     title: "",
            //     warning: true,
            //     message: "Please input API Key",
            // })
            dialog({
                content: "Please input API Key",
                noText: 'Close',
                error: true
            });
            apiKey.className = `${apiKey.className} cm-input-item-error`
            return false

        }
        const response = await fetch('/bizyair/set_api_key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `api_key=${encodeURIComponent(apiKey.value)}`
        });
        if (response.ok) {
            alert('API Key set successfully!');
            setCookie('api_key', apiKey.value, 30);
        } else {
            alert('Failed to set API Key: ' + await response.text());
        }
        return response
    }
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    const content =
        $el("div.comfy-modal-content",
            [
                $el('input.cm-input-item', {
                    id: 'bizyair-api-key',
                    type: 'password',
                    placeholder: 'API Key',
                    onchange: function() {
                        this.className = 'cm-input-item'
                    }
                }),
                $el('p.confirm-word', {}, ['Please visit', $el('a.bizyair-link', { href: 'https://cloud.siliconflow.cn', target: '_blank' }, ['https://cloud.siliconflow.cn']), " to get your key."]),
                $el('p.confirm-word', {}, [
                    "Setting the API Key signifies agreement to the",
                    $el('a.bizyair-link', {
                        href: 'https://docs.siliconflow.cn/docs/user-agreement',
                        target: '_blank'
                    }, ['User Agreement']),
                    " and",
                    $el('a.bizyair-link', {
                        href: 'https://docs.siliconflow.cn/docs/privacy-policy',
                        target: '_blank'
                    }, ['Privacy Policy.']),
                ])
            ]
        );
    dialog({
        title: 'Set API Key',
        content: content,
        yesText: 'Submit',
        noText: 'Close',
        onYes: toSubmit
    });
}